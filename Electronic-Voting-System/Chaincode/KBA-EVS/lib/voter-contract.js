/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const candidateContract = require('./candidate-contract');


class VoterContract extends Contract {

    async voterExists(ctx, voterId) {
        const buffer = await ctx.stub.getState(voterId);
        return (!!buffer && buffer.length > 0);
    }

    async createVoter(ctx, voterId, voterName ,dob,constituency) {

        const mspID = ctx.clientIdentity.getMSPID();

     if (mspID === 'eci-evs-com') {
        const exists = await this.voterExists(ctx, voterId);
        if (exists) {
            throw new Error(`The voter ${voterId} already exists`);
        }
        const asset = { 
                       assetType: 'voter',
                       Id:voterId,
                       voterName:voterName,
                       dob:dob,
                       constituency:constituency,
                       enrolledStatus: "No",
                       voteCasted :"No",
                       candidateName:"",
                       
                    };
        const buffer = Buffer.from(JSON.stringify(asset));
        let addVoterEventData = { Type: 'Party creation', voterName :voterName };
        await ctx.stub.setEvent('addVoterEvent', Buffer.from(JSON.stringify(addVoterEventData)));
        await ctx.stub.putState(voterId, buffer);
     }else {
        return `User under the following MSP: ${mspID} cannot perform this action`
       }
    }

    async readVoter(ctx, voterId) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        const buffer = await ctx.stub.getState(voterId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateVoter(ctx, voterId, newValue) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        const asset = { voterName: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(voterId, buffer);
    }

    async deleteVoter(ctx, voterId) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        await ctx.stub.deleteState(voterId);
    }

    async getAllResults(iterator, isHistory) {
        let allResult = []
        for (let res = await iterator.next(); !res.done; res = await iterator.next()) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {}
                if (isHistory && isHistory == true) {
                    jsonRes.TxId = res.value.txId
                    jsonRes.TimeStamp = res.value.timestamp
                    jsonRes.Record = JSON.parse(res.value.value.toString())

                }
                else {
                    jsonRes.Key = res.value.key
                    jsonRes.Record = JSON.parse(res.value.value.toString())
                }
                allResult.push(jsonRes)

            }
        }
        await iterator.close()
        return allResult
    }


    async queryAllVoter(ctx) {
        const queryString = {
            selector: {
                assetType: 'voter'
            },
        }
        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        //console.log(resultIterator);
        let result = await this.getAllResults(resultIterator, false)
        return JSON.stringify(result)
    }

    
    async getVoterHistory(ctx, voterId,voterName,dob) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }

        const asset=await this.readVoter(ctx, voterId);
        if(asset.voterName != voterName || asset.dob !=dob){
            throw new Error(`The voter ${voterId} does not exist`);
        }
        let resultIterator = await ctx.stub.getHistoryForKey(voterId)
        let result = await this.getAllResults(resultIterator, true)
        return JSON.stringify(result)
    }

    async enrollVoter(ctx, voterId ,voterName,dob) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }

        const asset=await this.readVoter(ctx, voterId);
        if(asset.voterName != voterName || asset.dob !=dob){
            throw new Error(`The voter ${voterId} does not exist`);
        }

        if(asset.enrolledStatus == "No"){
            asset.enrolledStatus="Yes";
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(voterId, buffer);
        }
        
        return asset;
    }

    async castVote(ctx, voterId, candidateName ) {
        const exists = await this.voterExists(ctx, voterId);
        if (!exists) {
            throw new Error(`The voter ${voterId} does not exist`);
        }
        const asset=await this.readVoter(ctx, voterId);
        asset.voteCasted="Yes";
        asset.candidateName=candidateName;

        // const candidateContract =new candidateContract();
        // await candidateContract.addVote(candidateId);
        
        
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(voterId, buffer);

        return asset;
    }

    async getVotersWithPagination(ctx, pageSize, bookMark) {
        const queryString = {
            selector: {
                assetType: 'voter'
            }
        }
        const pageSizeInt = parseInt(pageSize, 10)
        const { iterator, metadata } = await ctx.stub.getQueryResultWithPagination(JSON.stringify(queryString), pageSizeInt, bookMark)
        let result = await this.getAllResults(iterator, false)
        let results = {}
        results.Result = result
        console.log("@@@@@@@@@metadata", metadata)
        results.ResponseMetaData = {
            RecordCount: metadata.fetchedRecordsCount,
            BookMark: metadata.bookmark
        }
        return JSON.stringify(results)
    }


}

module.exports = VoterContract;

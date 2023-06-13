/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');


class CandidateContract extends Contract {

    async candidateExists(ctx, candidateId) {
        const buffer = await ctx.stub.getState(candidateId);
        return (!!buffer && buffer.length > 0);
    }

    async createCandidate(ctx, candidateId, candidateName ,constituency ,party) {


        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {
            const exists = await this.candidateExists(ctx, candidateId);
            if (exists) {
               throw new Error(`The candidate ${candidateId} already exists`);
            }
            const asset = { 
                assetType: 'candidate',
                candidateId:candidateId,
                candidateName:candidateName,
                constituency :constituency,
                party :party,
                totalVotes :0
             };
            const buffer = Buffer.from(JSON.stringify(asset));
            let addCandidateEventData = { Type: 'Candidate creation', candidateName: candidateName };
            await ctx.stub.setEvent('addCandidateEvent', Buffer.from(JSON.stringify(addCandidateEventData)));
            await ctx.stub.putState(candidateId, buffer);
           
        }else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }
    }

    async readCandidate(ctx, candidateId) {
        const exists = await this.candidateExists(ctx, candidateId);
        if (!exists) {
            throw new Error(`The candidate ${candidateId} does not exist`);
        }
        const buffer = await ctx.stub.getState(candidateId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateCandidate(ctx, candidateId, candidateName ,constituency ,party) {

        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {

            const exists = await this.candidateExists(ctx, candidateId);
            if (!exists) {
               throw new Error(`The candidate ${candidateId} does not exist`);
            }
            const asset = { value: newValue };
            const buffer = Buffer.from(JSON.stringify(asset));
           await ctx.stub.putState(candidateId, buffer);
        }else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }
    }

    async deleteCandidate(ctx, candidateId) {
        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {

          const exists = await this.candidateExists(ctx, candidateId);
          if (!exists) {
            throw new Error(`The candidate ${candidateId} does not exist`);
          }
          await ctx.stub.deleteState(candidateId);
        }else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }
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


    async queryAllCandidate(ctx) {
        const queryString = {
            selector: {
                assetType: 'candidate'
            },
        }
        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        //console.log(resultIterator);
        let result = await this.getAllResults(resultIterator, false)
        return JSON.stringify(result)
    }

    async totalCandidate(ctx ,constituency) {
        const queryString = {
            selector: {
                constituency :constituency,
            },
        }
        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        //console.log(resultIterator);
        let result = await this.getAllResults(resultIterator, false)
        return JSON.stringify(result)
    }

    
    async getCandidateHistory(ctx, candidateId) {
        let resultIterator = await ctx.stub.getHistoryForKey(candidateId)
        let result = await this.getAllResults(resultIterator, true)
        return JSON.stringify(result)
    }


    async addVote(ctx, candidateId) {

            const exists = await this.candidateExists(ctx, candidateId);
            if (!exists) {
               throw new Error(`The candidate ${candidateId} does not exist`);
            }
            const asset=await this.readCandidate(ctx, candidateId);
            asset.totalVotes=asset.totalVotes+1;
           const buffer = Buffer.from(JSON.stringify(asset));
           await ctx.stub.putState(candidateId, buffer);
       
    }


    async getCandidateWithPagination(ctx, pageSize, bookMark) {
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

module.exports = CandidateContract;

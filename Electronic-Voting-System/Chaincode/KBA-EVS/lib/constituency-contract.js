/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');


class ConstituencyContract extends Contract {

    async constituencyExists(ctx, constituencyId) {
        const buffer = await ctx.stub.getState(constituencyId);
        return (!!buffer && buffer.length > 0);
    }

    async createConstituency(ctx, constituencyId, constituencyName) {

        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {
           const exists = await this.constituencyExists(ctx, constituencyId);
            if (exists) {
                 throw new Error(`The constituency ${constituencyId} already exists`);
            }
            const asset = { 
                assetType: 'constituency',
                constituencyId :constituencyId,
                constituencyName :constituencyName,
            };
            const buffer = Buffer.from(JSON.stringify(asset));
            let addConstituencyEventData = { Type: 'Constituation creation', constituencyName: constituencyName };
            await ctx.stub.setEvent('addConstituencyEvent', Buffer.from(JSON.stringify(addConstituencyEventData)));
            await ctx.stub.putState(constituencyId, buffer);
        }else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }

    }

    async readConstituency(ctx, constituencyId) {
        const exists = await this.constituencyExists(ctx, constituencyId);
        if (!exists) {
            throw new Error(`The constituency ${constituencyId} does not exist`);
        }
        const buffer = await ctx.stub.getState(constituencyId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateConstituency(ctx, constituencyId, newValue) {

        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {
            const exists = await this.constituencyExists(ctx, constituencyId);
            if (!exists) {
                throw new Error(`The constituency ${constituencyId} does not exist`);
            }
            const asset = { value: newValue };
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(constituencyId, buffer);
        }else {
            return `User under the following MSP: ${mspID} cannot perform this action`
        }
        
    }

    async deleteConstituency(ctx, constituencyId) {

        const mspID = ctx.clientIdentity.getMSPID();

        if (mspID === 'eci-evs-com') {
             const exists = await this.constituencyExists(ctx, constituencyId);
             if (!exists) {
                throw new Error(`The constituency ${constituencyId} does not exist`);
             }  
             await ctx.stub.deleteState(constituencyId);
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


    async queryAllConstituency(ctx) {
        const queryString = {
            selector: {
                assetType: 'constituency'
            },
        }
        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        //console.log(resultIterator);
        let result = await this.getAllResults(resultIterator, false)
        return JSON.stringify(result)
    }

    
    async getConstituencyHistory(ctx, constituencyId) {
        let resultIterator = await ctx.stub.getHistoryForKey(constituencyId)
        let result = await this.getAllResults(resultIterator, true)
        return JSON.stringify(result)
    }

    async getConstituencyWithPagination(ctx, pageSize, bookMark) {
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

module.exports = ConstituencyContract;

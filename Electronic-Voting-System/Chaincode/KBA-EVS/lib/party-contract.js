/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PartyContract extends Contract {

    async partyExists(ctx, partyId) {
        const buffer = await ctx.stub.getState(partyId);
        return (!!buffer && buffer.length > 0);
    }

    async createParty(ctx, partyId, partyName) {

        const mspID = ctx.clientIdentity.getMSPID();

     if (mspID === 'eci-evs-com') {
        const exists = await this.partyExists(ctx, partyId);
        if (exists) {
            throw new Error(`The party ${partyId} already exists`);
        }
        const asset = { 
            assetType: 'party',
            partyId :partyId,
            partyName :partyName,
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        let addPartyEventData = { Type: 'Party creation', partyName :partyName };
         await ctx.stub.setEvent('addPartyEvent', Buffer.from(JSON.stringify(addPartyEventData)));
        await ctx.stub.putState(partyId, buffer);
     }else {
         return `User under the following MSP: ${mspID} cannot perform this action`
        }
    }

    async readParty(ctx, partyId) {
        const exists = await this.partyExists(ctx, partyId);
        if (!exists) {
            throw new Error(`The party ${partyId} does not exist`);
        }
        const buffer = await ctx.stub.getState(partyId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateParty(ctx, partyId, newValue) {
        const exists = await this.partyExists(ctx, partyId);
        if (!exists) {
            throw new Error(`The party ${partyId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(partyId, buffer);
    }

    async deleteParty(ctx, partyId) {
        const exists = await this.partyExists(ctx, partyId);
        if (!exists) {
            throw new Error(`The party ${partyId} does not exist`);
        }
        await ctx.stub.deleteState(partyId);
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


    async queryAllParty(ctx) {
        const queryString = {
            selector: {
                assetType: 'party'
            },
        }
        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        //console.log(resultIterator);
        let result = await this.getAllResults(resultIterator, false)
        return JSON.stringify(result)
    }

    
    async getPartyHistory(ctx, partyId) {
        let resultIterator = await ctx.stub.getHistoryForKey(partyId)
        let result = await this.getAllResults(resultIterator, true)
        return JSON.stringify(result)
    }

    async getPartyWithPagination(ctx, pageSize, bookMark) {
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

module.exports = PartyContract;

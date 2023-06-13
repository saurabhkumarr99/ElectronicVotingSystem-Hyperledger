/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

async function getCollectionName(ctx) {
    const mspid = ctx.clientIdentity.getMSPID();
    const collectionName = `_implicit_org_${mspid}`;
    return collectionName;
}

class VoteContract extends Contract {

    async voteExists(ctx, voteId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, voteId);
        return (!!data && data.length > 0);
    }

    async createVote(ctx, voteId ,voterId , candidateName) {
        const exists = await this.voteExists(ctx, voteId);
        if (exists) {
            throw new Error(`The asset vote ${voteId} already exists`);
        }

        const privateAsset = { };

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 ) {
            throw new Error('The privateValue key was not specified in transient data. Please try again.');
        }
        //privateAsset.privateValue = transientData.get('privateValue').toString();
        privateAsset.voteId = transientData.get('voteId').toString();
        privateAsset.candidateName = transientData.get('candidateName').toString();
        privateAsset.assetType = 'private'



        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, voteId, Buffer.from(JSON.stringify(privateAsset)));
    }

    async readVote(ctx, voteId) {
        const exists = await this.voteExists(ctx, voteId);
        if (!exists) {
            throw new Error(`The asset vote ${voteId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, voteId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }

    async updateVote(ctx, voteId) {
        const exists = await this.voteExists(ctx, voteId);
        if (!exists) {
            throw new Error(`The asset vote ${voteId} does not exist`);
        }
        const privateAsset = {};

        const transientData = ctx.stub.getTransient();
        if (transientData.size === 0 || !transientData.has('privateValue')) {
            throw new Error('The privateValue key was not specified in transient data. Please try again.');
        }
        privateAsset.privateValue = transientData.get('privateValue').toString();

        const collectionName = await getCollectionName(ctx);
        await ctx.stub.putPrivateData(collectionName, voteId, Buffer.from(JSON.stringify(privateAsset)));
    }

    async deleteVote(ctx, voteId) {
        const exists = await this.voteExists(ctx, voteId);
        if (!exists) {
            throw new Error(`The asset vote ${voteId} does not exist`);
        }
        const collectionName = await getCollectionName(ctx);
        await ctx.stub.deletePrivateData(collectionName, voteId);
    }

    async verifyVote(ctx, mspid, voteId, objectToVerify) {

        // Convert provided object into a hash
        const hashToVerify = crypto.createHash('sha256').update(objectToVerify).digest('hex');
        const pdHashBytes = await ctx.stub.getPrivateDataHash(`_implicit_org_${mspid}`, voteId);
        if (pdHashBytes.length === 0) {
            throw new Error('No private data hash with the key: ' + voteId);
        }

        const actualHash = Buffer.from(pdHashBytes).toString('hex');

        // Compare the hash calculated (from object provided) and the hash stored on public ledger
        if (hashToVerify === actualHash) {
            return true;
        } else {
            return false;
        }
    }


}

module.exports = VoteContract;

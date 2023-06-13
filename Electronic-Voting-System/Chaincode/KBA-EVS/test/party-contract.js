/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PartyContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PartyContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PartyContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"party 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"party 1002 value"}'));
    });

    describe('#partyExists', () => {

        it('should return true for a party', async () => {
            await contract.partyExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a party that does not exist', async () => {
            await contract.partyExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createParty', () => {

        it('should create a party', async () => {
            await contract.createParty(ctx, '1003', 'party 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"party 1003 value"}'));
        });

        it('should throw an error for a party that already exists', async () => {
            await contract.createParty(ctx, '1001', 'myvalue').should.be.rejectedWith(/The party 1001 already exists/);
        });

    });

    describe('#readParty', () => {

        it('should return a party', async () => {
            await contract.readParty(ctx, '1001').should.eventually.deep.equal({ value: 'party 1001 value' });
        });

        it('should throw an error for a party that does not exist', async () => {
            await contract.readParty(ctx, '1003').should.be.rejectedWith(/The party 1003 does not exist/);
        });

    });

    describe('#updateParty', () => {

        it('should update a party', async () => {
            await contract.updateParty(ctx, '1001', 'party 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"party 1001 new value"}'));
        });

        it('should throw an error for a party that does not exist', async () => {
            await contract.updateParty(ctx, '1003', 'party 1003 new value').should.be.rejectedWith(/The party 1003 does not exist/);
        });

    });

    describe('#deleteParty', () => {

        it('should delete a party', async () => {
            await contract.deleteParty(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a party that does not exist', async () => {
            await contract.deleteParty(ctx, '1003').should.be.rejectedWith(/The party 1003 does not exist/);
        });

    });

});

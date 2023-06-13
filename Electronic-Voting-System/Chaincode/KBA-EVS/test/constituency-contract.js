/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ConstituencyContract } = require('..');
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

describe('ConstituencyContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ConstituencyContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"constituency 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"constituency 1002 value"}'));
    });

    describe('#constituencyExists', () => {

        it('should return true for a constituency', async () => {
            await contract.constituencyExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a constituency that does not exist', async () => {
            await contract.constituencyExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createConstituency', () => {

        it('should create a constituency', async () => {
            await contract.createConstituency(ctx, '1003', 'constituency 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"constituency 1003 value"}'));
        });

        it('should throw an error for a constituency that already exists', async () => {
            await contract.createConstituency(ctx, '1001', 'myvalue').should.be.rejectedWith(/The constituency 1001 already exists/);
        });

    });

    describe('#readConstituency', () => {

        it('should return a constituency', async () => {
            await contract.readConstituency(ctx, '1001').should.eventually.deep.equal({ value: 'constituency 1001 value' });
        });

        it('should throw an error for a constituency that does not exist', async () => {
            await contract.readConstituency(ctx, '1003').should.be.rejectedWith(/The constituency 1003 does not exist/);
        });

    });

    describe('#updateConstituency', () => {

        it('should update a constituency', async () => {
            await contract.updateConstituency(ctx, '1001', 'constituency 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"constituency 1001 new value"}'));
        });

        it('should throw an error for a constituency that does not exist', async () => {
            await contract.updateConstituency(ctx, '1003', 'constituency 1003 new value').should.be.rejectedWith(/The constituency 1003 does not exist/);
        });

    });

    describe('#deleteConstituency', () => {

        it('should delete a constituency', async () => {
            await contract.deleteConstituency(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a constituency that does not exist', async () => {
            await contract.deleteConstituency(ctx, '1003').should.be.rejectedWith(/The constituency 1003 does not exist/);
        });

    });

});

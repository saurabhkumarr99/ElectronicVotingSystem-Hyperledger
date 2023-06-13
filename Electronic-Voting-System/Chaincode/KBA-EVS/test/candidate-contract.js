/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CandidateContract } = require('..');
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

describe('CandidateContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CandidateContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"candidate 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"candidate 1002 value"}'));
    });

    describe('#candidateExists', () => {

        it('should return true for a candidate', async () => {
            await contract.candidateExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a candidate that does not exist', async () => {
            await contract.candidateExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createCandidate', () => {

        it('should create a candidate', async () => {
            await contract.createCandidate(ctx, '1003', 'candidate 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"candidate 1003 value"}'));
        });

        it('should throw an error for a candidate that already exists', async () => {
            await contract.createCandidate(ctx, '1001', 'myvalue').should.be.rejectedWith(/The candidate 1001 already exists/);
        });

    });

    describe('#readCandidate', () => {

        it('should return a candidate', async () => {
            await contract.readCandidate(ctx, '1001').should.eventually.deep.equal({ value: 'candidate 1001 value' });
        });

        it('should throw an error for a candidate that does not exist', async () => {
            await contract.readCandidate(ctx, '1003').should.be.rejectedWith(/The candidate 1003 does not exist/);
        });

    });

    describe('#updateCandidate', () => {

        it('should update a candidate', async () => {
            await contract.updateCandidate(ctx, '1001', 'candidate 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"candidate 1001 new value"}'));
        });

        it('should throw an error for a candidate that does not exist', async () => {
            await contract.updateCandidate(ctx, '1003', 'candidate 1003 new value').should.be.rejectedWith(/The candidate 1003 does not exist/);
        });

    });

    describe('#deleteCandidate', () => {

        it('should delete a candidate', async () => {
            await contract.deleteCandidate(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a candidate that does not exist', async () => {
            await contract.deleteCandidate(ctx, '1003').should.be.rejectedWith(/The candidate 1003 does not exist/);
        });

    });

});

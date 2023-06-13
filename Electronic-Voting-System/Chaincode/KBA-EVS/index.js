/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const CandidateContract = require('./lib/candidate-contract');
const CostituencyContract = require('./lib/constituency-contract');
const PartyContract = require('./lib/party-contract');
const VoterContract = require('./lib/voter-contract');
const voteContract =require('./lib/vote-contract');

module.exports.CandidateContract = CandidateContract;
module.exports.CostituencyContract= CostituencyContract;
module.exports.PartyContract = PartyContract;
module.exports.VoterContract = VoterContract;
module.exports.voteContract =voteContract;


module.exports.contracts = [CandidateContract,CostituencyContract,PartyContract, VoterContract ,voteContract];

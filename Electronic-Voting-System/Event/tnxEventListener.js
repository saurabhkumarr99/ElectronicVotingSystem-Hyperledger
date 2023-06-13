const { EventListener } = require('./events')

let EciEvent = new EventListener();
EciEvent.txnEventListener("eci", "Admin", "evschannel",
    "KBA-EVS", "CandidateContract", "createCandidate",
    "Cdt-03", "Candidate-03", "Constituency-03", "Party-03");


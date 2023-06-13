const { EventListener } = require('./events')

let EciEvent = new EventListener();

EciEvent.contractEventListener("eci", "Admin", "evschannel",
    "KBA-EVS", "CandidateContract", "addCandidateEvent");


EciEvent.contractEventListener("eci", "Admin", "evschannel",
    "KBA-EVS", "ConstituencyContract", "addConstituencyEvent");


EciEvent.contractEventListener("eci", "Admin", "evschannel",
    "KBA-EVS", "PartyContract", "addPartyEvent");


EciEvent.contractEventListener("eci", "Admin", "evschannel",
    "KBA-EVS", "VoterContract", "addVoterEvent");
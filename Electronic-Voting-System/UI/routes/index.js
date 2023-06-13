var express = require('express');
var router = express.Router();
const { ClientApplication } = require('../../Client/client')
let EciClient = new ClientApplication();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Electronic Voting System', dashboard: 'ECI Dashboard' });
});



router.post('/createCandidate', function (req, res) {

  const CandidateId = req.body.CandidateId;
  const CandidateName = req.body.CandidateName;
  const constituency=req.body.constituency;
  const party=req.body.party;


  EciClient.generateAndSubmitTxn(
        "eci",
        "Admin",
        "evschannel",
        "KBA-EVS",
        "CandidateContract",
        "invokeTxn",
        "",
        "createCandidate",
        CandidateId, CandidateName ,constituency,party
      )
        .then(message => {
          console.log("Message is ", message)
          res.status(200).send({ message: "Added Candidate" })
        }
        )
        .catch(error => {
          console.log("Some error Occured: ", error)
          res.status(500).send({ error: `Failed to Add`, message: `${error}` })
        });
});


router.post('/readCandidate', async function (req, res) {
  const readCandidateId = req.body.CandidateId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "CandidateContract",
    "queryTxn",
    "",
    "readCandidate",
    readCandidateId
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Candidatedata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})


router.post('/getAllCandidate', async function (req, res) {
  
  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "CandidateContract",
    "queryTxn",
    "",
    "queryAllCandidate",
   
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Candidatedata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})


router.post('/deleteCandidate', async function (req, res) {
  
  const CandidateId = req.body.CandidateId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "CandidateContract",
    "queryTxn",
    "",
    "deleteCandidate",
    CandidateId
  ).then(message => {
    console.log(message.toString());
    alert("vgh");

    res.status(200).send({ Candidatedata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})



router.post('/createConstituency', function (req, res) {

  const ConstituencyId = req.body.ConstituencyId;
  const ConstituencyName = req.body.ConstituencyName;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "ConstituencyContract",
    "invokeTxn",
    "",
    "createConstituency",
    ConstituencyId, ConstituencyName
  )
    .then(message => {
      console.log("Message is ", message)
      res.status(200).send({ message: "Added Constituency" })
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Add`, message: `${error}` })
    });
});


router.post('/readConstituency', async function (req, res) {
  const readConstituencyId = req.body.ConstituencyId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "ConstituencyContract",
    "queryTxn",
    "",
    "readConstituency",
    readConstituencyId
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Constituencydata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})


router.post('/getAllConstituency', async function (req, res) {
  
  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "ConstituencyContract",
    "queryTxn",
    "",
    "queryAllConstituency",
   
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Constituencydata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})




router.post('/createParty', function (req, res) {

  const PartyId = req.body.PartyId;
  const PartyName = req.body.PartyName;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "PartyContract",
    "invokeTxn",
    "",
    "createParty",
    PartyId, PartyName
  )
    .then(message => {
      console.log("Message is ", message)
      res.status(200).send({ message: "Added Party" })
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Add`, message: `${error}` })
    });
});


router.post('/readParty', async function (req, res) {
  const readPartyId = req.body.PartyId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "PartyContract",
    "queryTxn",
    "",
    "readParty",
    readPartyId
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Partydata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

});
  

router.post('/getAllParty', async function (req, res) {
  
  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "PartyContract",
    "queryTxn",
    "",
    "queryAllParty",
   
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Partydata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})




router.post('/createVoter', function (req, res) {

  const VoterId = req.body.VoterId;
  const VoterName = req.body.VoterName;
  const dob=req.body.dob;
  const constituency=req.body.constituency

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "invokeTxn",
    "",
    "createVoter",
    VoterId, VoterName ,dob,constituency
  )
    .then(message => {
      console.log("Message is ", message)
      res.status(200).send({ message: "Added Voter" })
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Add`, message: `${error}` })
    });
});

router.post('/readVoter', async function (req, res) {
  const readVoterId = req.body.VoterId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "queryTxn",
    "",
    "readVoter",
    readVoterId
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Voterdata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

});

router.post('/VoterHistory', async function (req, res) {
  const readVoterId = req.body.VoterId;
  const VoterName = req.body.VoterName;
  const dob=req.body.dob;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "queryTxn",
    "",
    "getVoterHistory",
    readVoterId ,VoterName,dob
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Voterdata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

});

router.post('/enrollVoter', function (req, res) {

  const VoterId = req.body.VoterId;
  const VoterName = req.body.VoterName;
  const dob=req.body.dob;
 

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "invokeTxn",
    "",
    "enrollVoter",
    VoterId, VoterName ,dob
  )
    .then(message => {
      console.log("Message is ", message)
      //res.status(200).send({ Voterdata: message.toString() ,message: "Voter Enrolled" })
      res.status(200).send({ Voterdata: message.toString() });
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Enroll`, message: `${error}` })
    });
});

router.post('/submitVote', function (req, res) {

  const VoterId = req.body.VoterId;
  const candidateName = req.body.candidateName;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "invokeTxn",
    "",
    "castVote",
    VoterId, candidateName 
  )

    .then(message => {
      console.log("Message is ", message)
      //res.status(200).send({ Voterdata: message.toString() ,message: "Voter Enrolled" })
      
      res.status(200).send({ Voterdata: message.toString() });
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Enroll`, message: `${error}` })
    });
});

router.post('/getAllVoter', async function (req, res) {
  
  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "queryTxn",
    "",
    "queryAllVoter",
   
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Voterdata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})


router.post('/RecordVote', function (req, res) {

  const candidateId = req.body.candidateId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "CandidateContract",
    "invokeTxn",
    "",
    "addVote",
    candidateId
  )
    
    .then(message => {
      console.log("Message is ", message)
      //res.status(200).send({ Voterdata: message.toString() ,message: "Voter Enrolled" })
      
      res.status(200).send({ Voterdata: message.toString() });
    }
    )
    .catch(error => {
      console.log("Some error Occured: ", error)
      res.status(500).send({ error: `Failed to Enroll`, message: `${error}` })
    });
});


module.exports = router;

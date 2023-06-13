var express = require('express');
var router = express.Router();
const { ClientApplication } = require('../../Client/client');
// const getAllConstituency = require('../public/javascripts/constituency');

let allConstituency;

let EciClient = new ClientApplication();

function myFun1(){
allConstituency=getAllConstituency();
console.log("a->"+allConstituency);
}


// router.use(function(req, res, next) {
//   myFun1();
//   next();
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  //allConstituency=getAllConstituency();
  res.render('voterForm', { title: 'Electronic Voting System', dashboard: 'ECI Dashboard' ,items:allConstituency});
});


router.post('/createVoter', function (req, res) {

  const VoterId = req.body.VoterId;
  const VoterName = req.body.VoterName;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "invokeTxn",
    "",
    "createVoter",
    VoterId, VoterName
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

})


  
router.post('/VoterHistory', async function (req, res) {
  const readVoterId = req.body.VoterId;

  EciClient.generateAndSubmitTxn(
    "eci",
    "Admin",
    "evschannel",
    "KBA-EVS",
    "VoterContract",
    "queryTxn",
    "",
    "getVoterHistory",
    readVoterId
  ).then(message => {
    console.log(message.toString());

    res.status(200).send({ Voterdata: message.toString() });
  }).catch(error => {

    res.status(500).send({ error: `Failed to Read`, message: `${error}` })
  });

})


module.exports = router;

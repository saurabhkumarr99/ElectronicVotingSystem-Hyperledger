var express = require('express');
var router = express.Router();
const { ClientApplication } = require('../../Client/client')
let EciClient = new ClientApplication();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('candidateForm', { title: 'Electronic Voting System', dashboard: 'ECI Dashboard' });
});


// router.post('/createCandidate', function (req, res) {

//   const CandidateId = req.body.CandidateId;
//   const CandidateName = req.body.CandidateName;

//   EciClient.generateAndSubmitTxn(
//     "eci",
//     "Admin",
//     "evschannel",
//     "KBA-EVS",
//     "CandidateContract",
//     "invokeTxn",
//     "",
//     "createCandidate",
//     CandidateId, CandidateName
//   )
//     .then(message => {
//       console.log("Message is ", message)
//       res.status(200).send({ message: "Added Candidate" })
//     }
//     )
//     .catch(error => {
//       console.log("Some error Occured: ", error)
//       res.status(500).send({ error: `Failed to Add`, message: `${error}` })
//     });
// });



// router.post('/readCandidate', async function (req, res) {
//   const readCandidateId = req.body.CandidateId;

//   EciClient.generateAndSubmitTxn(
//     "eci",
//     "Admin",
//     "evschannel",
//     "KBA-EVS",
//     "CandidateContract",
//     "queryTxn",
//     "",
//     "readCandidate",
//     readCandidateId
//   ).then(message => {
//     console.log(message.toString());

//     res.status(200).send({ Candidatedata: message.toString() });
//   }).catch(error => {

//     res.status(500).send({ error: `Failed to Read`, message: `${error}` })
//   });

// })





// router.post('/createConstituency', function (req, res) {

//   const ConstituencyId = req.body.ConstituencyId;
//   const ConstituencyName = req.body.ConstituencyName;

//   EciClient.generateAndSubmitTxn(
//     "eci",
//     "Admin",
//     "evschannel",
//     "KBA-EVS",
//     "ConstituencyContract",
//     "invokeTxn",
//     "",
//     "createConstituency",
//     ConstituencyId, ConstituencyName
//   )
//     .then(message => {
//       console.log("Message is ", message)
//       res.status(200).send({ message: "Added Constituency" })
//     }
//     )
//     .catch(error => {
//       console.log("Some error Occured: ", error)
//       res.status(500).send({ error: `Failed to Add`, message: `${error}` })
//     });
// });



// router.post('/readConstituency', async function (req, res) {
//   const readConstituencyId = req.body.ConstituencyId;

//   EciClient.generateAndSubmitTxn(
//     "eci",
//     "Admin",
//     "evschannel",
//     "KBA-EVS",
//     "ConstituencyContract",
//     "queryTxn",
//     "",
//     "readConstituency",
//     readConstituencyId
//   ).then(message => {
//     console.log(message.toString());

//     res.status(200).send({ Constituencydata: message.toString() });
//   }).catch(error => {

//     res.status(500).send({ error: `Failed to Read`, message: `${error}` })
//   });

// })


  

module.exports = router;

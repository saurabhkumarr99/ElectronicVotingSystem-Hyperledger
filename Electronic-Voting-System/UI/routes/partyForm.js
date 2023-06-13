var express = require('express');
var router = express.Router();
const { ClientApplication } = require('../../Client/client')
let EciClient = new ClientApplication();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('partyForm', { title: 'Electronic Voting System', dashboard: 'ECI Dashboard' });
});


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

})


  

module.exports = router;

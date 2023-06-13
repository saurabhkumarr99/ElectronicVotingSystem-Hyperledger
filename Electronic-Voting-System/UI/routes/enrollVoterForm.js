var express = require('express');
var router = express.Router();
const { ClientApplication } = require('../../Client/client')
let EciClient = new ClientApplication();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('enrollVoter', { title: 'Electronic Voting System', dashboard: 'ECI Dashboard' });
});

module.exports = router;
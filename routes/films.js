var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');

// Add auth middleware
router.use(auth);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const database = require('../db');

// Add auth middleware
router.use(auth);

/* GET films listing. */
router.get('/', function(req, res, next) {
    res.render('films', {
        title: 'Films',
        films: database.get('films')
    });
});

module.exports = router;

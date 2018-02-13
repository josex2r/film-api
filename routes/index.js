const express = require('express');
const router = express.Router();
const films = require('./films');
const login = require('./login');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user) {
        res.redirect('/films');
    } else {
        res.render('index', {
            title: 'Login',
            error: !!req.query.error,
            logout: !!req.query.logout
        });
    }
});

// Films routes
router.use('/films', films);

// Login routes
router.use('/', login);

module.exports = router;

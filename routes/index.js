const express = require('express');
const database = require('../lib/database');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Login',
        // error,
        // logout
    });
});

router.post('/login', (req, res) => {
    // const email = req.body.email;
    // const password = req.body.password;
    const { email, password } = req.body;
    const user = database.get('users').find((user) => {
        return user.email === email && user.password === password;
    });

    if (user) {
        req.session.user = user;
        res.redirect('/films');
    } else {
        res.redirect('/');
    }
});

module.exports = router;

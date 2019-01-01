const express = require('express');
const router = express.Router();
const database = require('../db');
const passport = require('../lib/passport');

router.use(passport.initialize());

router.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user)
    req.session.passport = req.user;
    res.redirect('/films');
  }
);

// Add auth middleware
router.post('/login', (req, res) => {
    const { email, password, remember } = req.body;
    const users = database.get('users');
    const user = users.find((user) => user.email === email && user.password === password);
    
    // Set 1h to expire
    if (remember) {
        req.sessionOptions.maxAge = 24 * 60 * 60 * 1000 // 24 hours
    }
    
    if (user) {
        req.session.passport = {
            nickname: user
        };
        res.redirect('/films');
    } else {
        res.redirect('/?error=true');
    }
});
 
// Logout endpoint
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/?logout=true');
});

module.exports = router;

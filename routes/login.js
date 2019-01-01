const express = require('express');
const router = express.Router();
const database = require('../lib/db');
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
    req.session.passport = req.user;
    res.redirect('/films');
  }
);
 
// Logout endpoint
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/?logout=true');
});

module.exports = router;

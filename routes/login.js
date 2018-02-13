const express = require('express');
const router = express.Router();
const database = require('../db');

// Add auth middleware
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = database.get('users');
    const user = users.find((user) => user.email === email && user.password === password);
    
    if (user) {
        req.session.user = user;
        res.redirect('/films');
    } else {
        res.redirect('/?error=true');
    }
});
 
// Logout endpoint
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/?logout=true');
});

module.exports = router;

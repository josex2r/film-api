var express = require('express');
var router = express.Router();

// Add auth middleware
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email === 'aaaa@aaaa.com' && password === 'aaaa') {
        req.session.user = {
            email,
            admin: true
        };
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

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const films = require('./films');
const login = require('./login');

/* GET home page. */
router.get('/', (req, res, next) => {
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

router.get('/busboy', (req, res, next) => {
    res.send(`
        <form action="busboy" method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Enviar</button>
        </form>
    `);
});

router.post('/busboy', (req, res, next) => {
    req.busboy.on('file', (attrName, file, filename, encoding, mimetype) => {
        const filePath = path.join(process.cwd(), 'public', 'tmp', filename);
        const writeStream = fs.createWriteStream(filePath);

        file.pipe(writeStream);

        writeStream.on('finish', () => {
            res.send('File uploaded!')
        });
    });
});

// Films routes
router.use('/films', films);

// Login routes
router.use('/', login);

module.exports = router;

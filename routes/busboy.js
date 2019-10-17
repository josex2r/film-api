const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send(`
        <form action="busboy" method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Enviar</button>
        </form>
    `);
});

router.post('/', (req, res, next) => {
    req.busboy.on('file', (attrName, file, filename, encoding, mimetype) => {
        const filePath = path.join(process.cwd(), 'public', 'tmp', filename);
        const writeStream = fs.createWriteStream(filePath);

        file.pipe(writeStream);

        writeStream.on('finish', () => {
            res.send('File uploaded!')
        });
    });
});

module.exports = router;

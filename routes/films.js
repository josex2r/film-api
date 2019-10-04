var express = require('express');
const database = require('../lib/database');
const filmParam = require('./params/film');

var router = express.Router();

filmParam(router);

// GET: List films
router.get('/', (req, res, next) => {
    res.render('films/index', {
        title: 'Films',
        films: database.get('films'),
        // filmAdded
    });
});

// GET: Add new film
router.get('/add', (req, res, next) => {
    res.render('films/add', {
        title: 'Add film',
        //film
    });
});

// POST: Add new film
router.post('/add', (req, res, next) => {
    res.render('films/add', {
        title: 'Add film',
        // film,
        // error
    });
});

// GET: Show film
router.get('/:film', (req, res, next) => {
    const film = req.film;

    res.render('films/film', {
        title: film.name,
        film
    });
});

module.exports = router;

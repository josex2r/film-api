var express = require('express');
var router = express.Router();
const auth = require('./middlewares/auth');
const filmParam = require('./params/film');
const database = require('../db');

// Add auth middleware
router.use(auth);

// GET: List films
router.get('/', (req, res, next) => {
    res.render('films/index', {
        title: 'Films',
        films: database.get('films'),
        filmAdded: !!req.query.filmAdded
    });
});

// GET: Add new film
router.get('/add', (req, res, next) => {
    res.render('films/add', {
        title: 'Add film',
        film: {}
    });
});

// POST: Add new film
router.post('/add', (req, res, next) => {
    const film = req.body;
    const { name, description, image } = film;
    let error = '';
    
    if (!name || !description || !image) {
        error = 'Todos los campos son obligatorios';
        res.render('films/add', {
            title: 'Add film',
            film,
            error
        });
    } else {
        database.addFilm(film);
        res.redirect('/films?filmAdded=true');
    }
});

// GET: Show film
router.get('/:film', (req, res, next) => {
    const film = req.film;
    
    res.render('films/film', {
        title: film.name,
        film
    });
});

// Parse film ID to append the film object to the request
filmParam(router);

module.exports = router;

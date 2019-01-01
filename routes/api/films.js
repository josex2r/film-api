const express = require('express');
const router = express.Router();
const filmParam = require('../params/film');
// const database = require('../../lib/db');
const database = require('../../lib/datastore');

router.get('/', async(req, res) => {
  const films = await database.getFilms();

  res.status(200).json(films);
});

router.post('/', async (req, res) => {
  const film = req.body;
  const { name, description, image } = film;
  console.log(req.body)
  
  if (!name || !description || !image) {
      res.sendStatus(400);
  } else {
    try {
      await database.addFilm(req.body);
      res.sendStatus(204);
    } catch(e) {
      res.sendStatus(404);
    }
  }
});

router.put('/', (req, res) => {
  res.sendStatus(405);
});

router.delete('/:film', async (req, res) => {
  try {
    await database.deleteFilm(req.film.id);
    res.sendStatus(204);
  } catch(e) {
    res.sendStatus(404);
  }
});

filmParam(router);

router.get('/:film', (req, res) => {
  res.status(200).json(req.film);
});

module.exports = router;

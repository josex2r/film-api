const express = require('express');
const router = express.Router();
const filmParam = require('../params/film');
const database = require('../../lib/db');

router.get('/', (req, res) => {
  res.status(200).json(database.get('films'));
});

router.post('/', (req, res) => {
  const film = req.body;
  const { name, description, image } = film;

  if (!name || !description || !image) {
      res.sendStatus(400);
  } else {
    try {
      database.addFilm(req.body);
      res.sendStatus(204);
    } catch(e) {
      res.sendStatus(404);
    }
  }
});

router.put('/', (req, res) => {
  res.sendStatus(405);
});

router.delete('/:film', (req, res) => {
  try {
    database.deleteFilm(req.film.id);
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

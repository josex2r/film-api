// const database = require('../../lib/db');
const database = require('../../lib/datastore');

module.exports = (router) =>
    // Parse film ID to append the film object to the request
    router.param('film', async (req, res, next, filmId) => {
        const film = await database.getFilm(filmId);
        
        if (film) {
            req.film = film;
            next();
        } else {
            res.sendStatus(404);
        }
    });

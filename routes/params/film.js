const database = require('../../db');

module.exports = (router) =>
    // Parse film ID to append the film object to the request
    router.param('film', (req, res, next, filmId) => {
        const film = database.get('films').find(({ id }) => id === filmId);
        
        if (film) {
            req.film = film;
            next();
        } else {
            res.sendStatus(404);
        }
    });
const database = require('../../lib/database');

module.exports  = (app) => {
    app.param('film', (req, res, next) => {
        const filmId = req.params.film;
        const film = database
            .get('films')
            .find((film) => film.id === filmId);

        if (film) {
            req.film = film;
            next();
        } else {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    });
};

const Datastore = require('@google-cloud/datastore');

const KEY_FILM = 'Film';
 
class DB {
  constructor() {
    this.datastore = new Datastore();
  }

  async get(kind, id) {
    console.log(`get(${kind}, ${id})`);

    let query = this.datastore.createQuery([kind])
    // .limit(limit)
    // .start(token)
      .order('name');

    if (id) {
      query = query.filter('__key__', '=', this.datastore.key([KEY_FILM, id]));
    }

    try {
      const [results, nextQuery] = await this.datastore.runQuery(query);
      // const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;

      return results;
    } catch (e) {
      throw e;
    }
  }

  getFilms() {
    return this.get(KEY_FILM);
  }

  async getFilm(id) {
    const results = await this.get(KEY_FILM, id);

    return results[0];
  }

  async addFilm(film) {
    if (!film.name || !film.description || !film.image) {
      throw new Error('All fields are required');
    }

    if (!film.id) {
      film.id = Math.random().toString(8).slice(2);
    }

    const key = this.datastore.key([KEY_FILM, film.id]);
    const entity = {
      key: key,
      data: film
    };

    try {
      await this.datastore.save(entity);
    } catch (e) {
      throw e;
    }
  }

  async deleteFilm(id) {
    if (!id) {
      throw new Error('No ID provided');
    }

    const key = this.datastore.key([KEY_FILM, id]);

    try {
      await this.datastore.delete(key);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new DB();

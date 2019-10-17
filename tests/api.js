const request = require('supertest');
const { expect } = require('chai');
const database = require('../lib/db');

// Mock required ENV vars
process.env.CLIENT_ID = 'XXXX';

// Import express App
const app = require('../app');

// Create a test object
const mockFilm = {
  name: 'foo',
  description: 'bar',
  image: 'wow'
};

describe('Login', function() {
  it('redirects to the login page if login fails', async function() {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'sponge@bob.com',
        password: 'garyTheSnail'
      });

    expect(response.statusCode).to.equal(302);
    expect(response.header.location).to.be.equal('/?error=true');
  });

  it('redirects to the films page if login success', async function() {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'aaaa@aaaa.com',
        password: 'aaaa'
      });

    expect(response.statusCode).to.equal(302);
    expect(response.header.location).to.be.equal('/films');
  });
});

describe('API GET', function() {
  it('responds with all the films', async function() {
    const response = await request(app)
      .get('/api/films')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).to.be.deep.equal(database.get('films'));
  });

  it('responds with 404 when film does not exist', async function() {
    return request(app)
      .put('/api/films/1')
      .expect(404);
  });

  it('responds with the requested film', async function() {
    database.addFilm(mockFilm);

    const response = await request(app)
      .get(`/api/films/${mockFilm.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).to.be.deep.equal(mockFilm);
  });
});

describe('API PUT', function() {
  it('responds with 405', async function() {
    return request(app)
      .put('/api/films')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(405);
  });
});

describe('API POST', function() {
  it('adds a film', async function() {
    await request(app)
      .post(`/api/films`)
      .send(mockFilm)
      .set('Accept', 'application/json')
      .expect(204);

    const film = database.get('films').find(({ name }) => name === mockFilm.name);

    expect(film.name).to.be.equal(mockFilm.name);
    expect(film.description).to.be.equal(mockFilm.description);
    expect(film.image).to.be.equal(mockFilm.image);
  });

  [
    { key: 'name', fields: { description: 'foo', image: 'bar' } },
    { key: 'description', fields: { name: 'foo', image: 'bar' } },
    { key: 'image', fields: { description: 'foo', name: 'bar' } }
  ].forEach(({ key, fields }) => {
    it(`responds with a 400 when there are empty fields (${key})`, async function() {
      return request(app)
        .post(`/api/films`)
        .send(fields)
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .expect(400);
    });
  });
});

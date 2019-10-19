const request = require('supertest');
const { expect } = require('chai');
const { extractCookies } = require('./utils/extract-cookies');

// Mock required ENV vars
process.env.CLIENT_ID = 'XXXX';

// Import express App
const app = require('../app');

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

describe('Logout', function() {
  let authenticatedRequest = request.agent(app);

  beforeEach(async () => {
    const response = await authenticatedRequest
      .post('/login')
      .send({
        email: 'aaaa@aaaa.com',
        password: 'aaaa'
      });
    const cookies = extractCookies(response.headers);

    expect(cookies.session.value).to.not.be.empty;
  });

  it('redirects to the login page after logout', async function() {
    const response = await authenticatedRequest
      .get('/logout');
    const cookies = extractCookies(response.headers);

    expect(cookies.session.value).to.be.empty;
    expect(response.statusCode).to.be.equal(302);
    expect(response.header.location).to.be.equal('/?logout=true');
  });
});

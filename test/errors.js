'use strict';

const agent = require('supertest').agent;
const app = require('../app');
const http = require('http');
const _ = require('lodash');

const INVALID_ID = 123456;

describe('/vehicle', () => {
  let request;
  beforeEach(() => {
    request = agent(http.createServer(app.callback()));
  });

  describe('404 errors', () => {
    _.each(['/', '/battery', '/fuel', '/doors'], (endpt) => {
      it('404s properly for /vehicles/:id' + endpt, (done) => {
        request
        .get('/vehicles/' + INVALID_ID + endpt)
        .expect(404, done);
      });
    });

    it('404s properly for /vehicles/:id/engine', (done) => {
      request
      .post('/vehicles/' + INVALID_ID + '/engine')
      .send({
        command: 'START'
      })
      .expect(404, done);
    });
  });
});

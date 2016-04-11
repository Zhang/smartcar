'use strict';

const agent = require('supertest').agent;
const app = require('../app');
const http = require('http');
//const expect = require('expect.js');
// const co = require('co');
// const _ = require('lodash');

describe('/vehicle', function() {
  let request;
  beforeEach(function() {
    request = agent(http.createServer(app.callback()));
  });

  describe('GET /:id', function() {
    it('should check vehicle information', function(done) {
      request
      .get('/vehicles/1234')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
    });
  });
});

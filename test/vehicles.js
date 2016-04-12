'use strict';

const agent = require('supertest').agent;
const app = require('../app');
const http = require('http');
const expect = require('expect.js');
const _ = require('lodash');

const VALID_IDS = [1234, 1235];

describe('/vehicle', () => {
  let request;
  beforeEach(() => {
    request = agent(http.createServer(app.callback()));
  });

  describe('GET /:id', () => {
    it('should return vehicle information', (done) => {
      request
      .get('/vehicles/' + VALID_IDS[0])
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        const body = res.body;

        expect(body).to.only.have.keys(['vin', 'color', 'doorCount', 'driveTrain']);
        _.each(['vin', 'color', 'driveTrain'], (key) => { expect(body[key]).to.be.a('string'); });
        expect(body.doorCount).to.be.a('number');

        done();
      });
    });
  });

  describe('GET /:id/fuel', () => {
    it('should return fuel levels', (done) => {
      request
      .get('/vehicles/' + VALID_IDS[0] + '/fuel')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.only.have.keys(['percent']);
        expect(res.body.percent === null || _.isNumber(res.body.percent)).to.be.ok();
        done();
      })
    });
  });

  describe('GET /:id/doors', () => {
    it('should return fuel levels', (done) => {
      request
      .get('/vehicles/' + VALID_IDS[0] + '/doors')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.only.have.keys(['location', 'locked']);
        expect(res.body[0].location).to.be.a('string');
        expect(res.body[0].locked).to.be.a('boolean');
        done();
      });
    });
  });

  describe('GET /:id/battery', () => {
    it('should return battery levels', (done) =>
      request
      .get('/vehicles/' + VALID_IDS[0] + '/battery')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.only.have.keys(['percent']);
        expect(res.body.percent === null || _.isNumber(res.body.percent)).to.be.ok();
        done();
      })
    );
  });

  describe('POST /:id/engine', () => {
    it('should succeed or fail in starting engine', (done) =>
      request
      .post('/vehicles/' + VALID_IDS[0] + '/engine')
      .send({
        action: 'START'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.only.have.keys(['status']);
        expect(['success', 'error']).to.contain(res.body.status);
        done();
      })
    );

    it('should succeed or fail in stopping engine', (done) =>
      request
      .post('/vehicles/' + VALID_IDS[0] + '/engine')
      .send({
        action: 'STOP'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        expect(res.body).to.only.have.keys(['status']);
        expect(['success', 'error']).to.contain(res.body.status);
        done();
      })
    );

    it('should 400 when receiving unknown action', (done) =>
      request
      .post('/vehicles/' + VALID_IDS[0] + '/engine')
      .send({
        action: 'WRONG ACTION'
      })
      .expect(400, done)
    );
  });
});

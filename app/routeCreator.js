'use strict';

//Common route wrapper, currently only logs and returns 500 errors

const bindGen = require('bind-gen');
const log = require('./logger');

const createRoute = function createRoute(cb) {
  return function* () {
    try {
      yield bindGen(cb, this);
    } catch(e) {
      log.error(e);
      this.status = 500;
      this.body = e;
    }
  };
};

module.exports = createRoute;

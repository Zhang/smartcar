'use strict';

const energyService = require('./energyService');
const routeCreator = require('../routeCreator');
const api = require('../GMApi');

const getFuelStatus = routeCreator(function* () {
  const res = yield energyService(this.params.id);
  this.status = res.status;

  if (res.status === 200) {
    this.body = {
      percent: res.fuel
    };
  } else {
    this.body = api.handleRequestErr(res);
  }
});

module.exports = getFuelStatus;

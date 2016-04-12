'use strict';

const energyService = require('./energyService');
const routeCreator = require('../routeCreator');
const api = require('../GMApi');
const _ = require('lodash');

const getFuelStatus = routeCreator(function* () {
  const res = yield energyService(this.params.id);
  this.status = api.getStatus(res);
  this.body = api.handleRequest(res.body, () => {
    return { percent: api.getValueByType(_.get(res.body.data, 'tankLevel')) };
  });
});

module.exports = getFuelStatus;

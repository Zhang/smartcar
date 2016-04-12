'use strict';

const api = require('../GMApi');

const energyService = function* energyService(id) {
  const res = yield api.post('getEnergyService', api.formatRequestBody(id));
  return res;
};

module.exports = energyService;

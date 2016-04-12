'use strict';

const api = require('../GMApi');

module.exports = function* energyService(id) {
  const res = yield api.post('getEnergyService', api.formatRequestBody(id));
  return res;
};

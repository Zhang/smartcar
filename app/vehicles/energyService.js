'use strict';

const api = require('../GMApi');
const _ = require('lodash');

const energyService = function* energyService(id) {
  const res = yield api.post('getEnergyService', api.formatRequestBody(id));
  const status = api.getStatus(res);

  if (api.is200(res)) {
    return {
      fuel: api.getValueByType(_.get(res.body.data, 'tankLevel')),
      battery: api.getValueByType(_.get(res.body.data, 'batteryLevel')),
      status
    };
  } else {
    res.body.status = status;
    return res.body;
  }
};

module.exports = energyService;

'use strict';

var api = require('../GMApi');
var _ = require('lodash');

const energyService = function* energyService() {
  try {
    const res = yield api.post('getEnergyService', api.formatPostWithId(this.params.id));

    if (api.is200(res)) {
      return {
        fuel: _.get(res.body.data, 'tankLevel.value'),
        battery: _.get(res.body.data, 'batteryLevel.value')
      };
    } else {
      return res.body.status;
    }
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = energyService;


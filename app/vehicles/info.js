'use strict';

const api = require('../GMApi');
const routeCreator = require('../routeCreator');

const getFuelLevel = routeCreator(function* () {
  const res = yield api.post('getVehicleInfoService', api.formatRequestBody(this.params.id));
  this.status = api.getStatus(res);

  this.body = api.handleRequest(res.body, function() {
    const carData = res.body.data;
    return {
      vin: api.getValueByType(carData.vin),
      color: api.getValueByType(carData.color),
      doorCount: carData.fourDoorSedan.value ? 4 : 2,
      driveTrain: api.getValueByType(carData.driveTrain)
    };
  });
});

module.exports = getFuelLevel;

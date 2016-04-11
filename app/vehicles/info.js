'use strict';

const api = require('../GMApi');
const routeCreator = require('../routeCreator');

const getFuelLevel = routeCreator(function* () {
  const res = yield api.post('getVehicleInfoService', api.formatRequestBody(this.params.id));
  this.status = api.getStatus(res);

  if (api.is200(res)) {
    const carData = res.body.data;
    this.body = {
      vin: api.getValueByType(carData.vin),
      color: api.getValueByType(carData.color),
      doorCount: carData.fourDoorSedan.value ? 4 : 2,
      driveTrain: api.getValueByType(carData.driveTrain)
    };
  } else {
    this.body = api.handleRequestErr(res.body);
  }
});

module.exports = getFuelLevel;

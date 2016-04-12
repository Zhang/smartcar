'use strict';

const api = require('../GMApi');
const routeCreator = require('../routeCreator');

module.exports = routeCreator(function* () {
  const res = yield api.post('getVehicleInfoService', api.formatRequestBody(this.params.id));
  this.status = api.getResponseStatus(res);

  this.body = api.handleRequest(res.body, () => {
    const carData = res.body.data;
    return {
      vin: api.getValueByType(carData.vin),
      color: api.getValueByType(carData.color),
      doorCount: carData.fourDoorSedan.value ? 4 : 2,
      driveTrain: api.getValueByType(carData.driveTrain)
    };
  });
});

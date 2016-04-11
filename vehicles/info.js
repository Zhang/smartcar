'use strict';

const api = require('../GMApi');

const getFuelLevel = function* getFuelLevel() {
  try {
    const res = yield api.post('getVehicleInfoService', api.formatPostWithId(this.params.id));
    this.status = parseInt(api.getStatus(res));

    if (api.is200(res)) {
      const carData = res.body.data;
      this.body = {
        vin: carData.vin.value,
        color: carData.color.value,
        doorCount: carData.fourDoorSedan.value ? '4' : '2',
        driveTrain: carData.driveTrain.value
      };
    } else {
      this.body = res.body;
    }
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = getFuelLevel;

'use strict';

var energyService = require('./energyService');

const getFuelStatus = function* getFuelStatus() {
  try {
    const fuelLevels = yield energyService();
    return {
      fuel: fuelLevels.fuel
    };
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = getFuelStatus;

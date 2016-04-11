'use strict';

var energyService = require('./energyService');

const getBatteryStatus = function* getBatteryStatus() {
  try {
    const fuelLevels = yield energyService();
    return {
      battery: fuelLevels.battery
    };
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = getBatteryStatus;


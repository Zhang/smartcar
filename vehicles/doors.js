'use strict';

var api = require('../GMApi');
var _ = require('lodash');

const getSecurityStatus = function* getSecurityStatus() {
  try {
    const res = yield api.post('getSecurityStatusService', api.formatPostWithId(this.params.id));

    if (api.is200(res)) {
      return _.map(res.body.data.doors.values, function(door) {
        return {
          location: door.location.value,
          locked: door.locked.value
        };
      });
    } else {
      return res.body.status;
    }
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = getSecurityStatus;

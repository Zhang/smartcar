'use strict';

const api = require('../GMApi');
const _ = require('lodash');
const routeCreator = require('../routeCreator');

const getSecurityStatus = routeCreator(function* () {
  const res = yield api.post('getSecurityStatusService', api.formatRequestBody(this.params.id));
  this.status = api.getStatus(res);

  if (api.is200(res)) {
    this.body = _.map(_.get(res.body, 'data.doors.values'), function(door) {
      return {
        location: api.getValueByType(door.location),
        locked: api.getValueByType(door.locked)
      };
    });
  } else {
    this.body = api.handleRequestErr(res.body);
  }
});

module.exports = getSecurityStatus;

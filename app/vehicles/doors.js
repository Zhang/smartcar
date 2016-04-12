'use strict';

const api = require('../GMApi');
const _ = require('lodash');
const routeCreator = require('../routeCreator');

module.exports = routeCreator(function* () {
  const res = yield api.post('getSecurityStatusService', api.formatRequestBody(this.params.id));
  this.status = api.getResponseStatus(res);

  this.body = api.handleRequest(res.body, () => {
    return _.map(_.get(res.body, 'data.doors.values'), (door) => {
      return {
        location: api.getValueByType(door.location),
        locked: api.getValueByType(door.locked)
      };
    });
  });
});

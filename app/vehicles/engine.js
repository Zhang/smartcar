'use strict';

const api = require('../GMApi');
const _ = require('lodash');
const routeCreator = require('../routeCreator');

const ACTIONS = {
  START: 'START_VEHICLE',
  STOP: 'STOP_VEHICLE'
};

const TRANSLATE_STATUS = {
  FAILED: 'error',
  EXECUTED: 'success'
};

module.exports = routeCreator(function* () {
  const action = _.get(this, 'request.body.action');
  const res = yield api.post('actionEngineService', api.formatRequestBody(this.params.id, {command: ACTIONS[action]}));
  this.status = api.getResponseStatus(res);
  this.body = api.handleRequest(res.body, () => {
    return {
      status: TRANSLATE_STATUS[res.body.actionResult.status]
    };
  });
});


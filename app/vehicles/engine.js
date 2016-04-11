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

const toggleEngine = routeCreator(function* () {
  const action = _.get(this, 'request.body.action');
  const res = yield api.post('actionEngineService', api.formatRequestBody(this.params.id, {command: ACTIONS[action]}));
  this.status = api.getStatus(res);

  if (api.is200(res)) {
    this.body = {
      status: TRANSLATE_STATUS[res.body.actionResult.status]
    };
  } else {
    this.body = api.handleRequestErr(res.body);
  }
});

module.exports = toggleEngine;


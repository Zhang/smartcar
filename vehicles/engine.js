'use strict';

const api = require('../GMApi');
const _ = require('lodash');
const ACTIONS = {
  START: 'START_VEHICLE',
  STOP: 'STOP_VEHICLE'
};

const TRANSLATE_STATUS = {
  FAILED: 'error',
  EXECUTED: 'success'
};

const toggleEngine = function* toggleEngine() {
  try {
    const action = _.get(this, 'body.action');
    const res = yield api.post('actionEngineService', api.formatPostWithId(this.params.id, {command: ACTIONS[action]}));

    if (api.is200(res)) {
      return {
        status: TRANSLATE_STATUS[res.body.actionResult.status]
      };
    } else {
      return res.body.status;
    }
  } catch(e) {
    console.error(e);
    this.status = 500;
    this.body = e;
  }
};

module.exports = toggleEngine;


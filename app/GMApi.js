'use strict';

//Abstraction layer to connect to the GM Api

const request = require('co-request');
const _ = require('lodash');

const BASE_URI = 'http://gmapi.azurewebsites.net/';
const BASE_CONFIG = {
  headers: { 'User-Agent': 'request' },
  'Content-Type': 'application/json'
};

const api = {
  post: function* post(path, json) {
    const config = _.defaults({
      method: 'POST',
      json: json || {},
      uri: BASE_URI + path
    }, BASE_CONFIG);

    const res = yield request(config);
    return res;
  },
  getStatus(res) {
    return parseInt(_.get(res, 'body.status'));
  },
  formatRequestBody(id, json) {
    return _.defaults({
      id,
      responseType: 'JSON'
    }, json || {});
  },
  handleRequest(resBody, onSuccess) {
    if (parseInt(resBody.status) === 200) {
      return onSuccess();
    } else {
      //Handle errors differently based on error codes in the future
      return resBody;
    }
  },
  getValueByType(val) {
    //Convert returned values into proper types
    if (!val.type || _.isUndefined(val.value)) throw new Error('Unexpected value format', val);
    if (val.type === 'String') {
      return val.value;
    } else if (val.type === 'Number') {
      return parseInt(val.value);
    } else if (val.type === 'Boolean') {
      return val.value === 'True';
    } else if (val.type === 'Null') {
      return null;
    } else {
      throw new Error('Unexpected value type format: ', val.type);
    }
  }
};

module.exports = api;

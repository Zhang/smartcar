'use strict';

//Abstraction layer on top of request, designed for the GM Api

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
  is200: function(res) {
    return this.getStatus(res) === 200;
  },
  getStatus: function(res) {
    return parseInt(_.get(res, 'body.status'));
  },
  formatRequestBody: function(id, json) {
    return _.defaults({
      id: id,
      responseType: 'JSON'
    }, json || {});
  },
  handleRequestErr: function(resBody) {
    //Handle errors differently based on error codes in the future
    return resBody;
  },
  getValueByType: function(val) {
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

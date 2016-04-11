'use strict';

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
  is200: function(response) {
    return _.get(response, 'body.status') === '200';
  },
  getStatus: function(res) {
    return _.get(res, 'body.status');
  },
  formatPostWithId: function(id, json) {
    return _.defaults({
      id: id,
      responseType: 'JSON'
    }, json || {});
  }
};

module.exports = api;

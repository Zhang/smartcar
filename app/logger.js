'use strict';

//common logger, only supports dev mode

const bunyan = require('bunyan');

const streams = [
  {
    level: 'info',
    stream: process.stdout // log INFO and above to stdout
  }
];

module.exports = bunyan.createLogger({
  name: 'smartcar',
  streams
});

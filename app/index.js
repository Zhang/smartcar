'use strict';

const log = require('.//logger');
const koa = require('koa');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const app = koa();

app.use(bodyParser());

app.on('error', (err) => { log.error(err); });

app.use(mount('/vehicles', require('./vehicles')));

module.exports = app;

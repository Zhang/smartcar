'use strict';

const app = require('koa')();
const router = require('koa-router')();

router.get('/:id/fuel', require('./fuel'));
router.get('/:id/doors', require('./doors'));
router.get('/:id/battery', require('./battery'));
router.post('/:id/engine', require('./engine'));
router.get('/:id', require('./info'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;

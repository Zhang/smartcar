#!/usr/bin/env node
'use strict';

const app = require('./app');
const log = require('./app/logger');

const port = process.env.PORT || 3000;
app.listen(port);
log.info(`app running on port: ${port}`);

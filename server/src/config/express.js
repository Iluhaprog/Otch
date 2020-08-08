const { logLevel } = require('./vars');
const express = require('express');
const app = express();

const expressWs = require('express-ws')(app);

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger })

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
    app: app,
    express: express,
    logger: logger
};
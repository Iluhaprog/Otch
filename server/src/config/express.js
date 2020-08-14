const { logLevel } = require('./vars');
const express = require('express');
const app = express();

const expressWs = require('express-ws')(app);
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
})

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger });

const { passport, session } = require('./passport');

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

module.exports = {
    app: app,
    express: express,
    logger: logger,
    wsInstance: expressWs,
    passport: passport
};
const { logLevel } = require('./vars');
const express = require('express');
const app = express();

const https = require('https');
const fs = require('fs');

const expressWs = require('express-ws');
const expressSession = require('express-session');

const pino = require('pino');
const expressPino = require('express-pino-logger');

const fileUpload = require('express-fileupload');

const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger });

const { passport, session } = require('./passport');

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload({
    createParentPath: true, 
    limits: {
        fileSize: 5 * 1024 * 1024 * 1024
    }
}));

const key = fs.readFileSync('/home/ilya/Documents/projects/otch/selfsigned.key');
const cert = fs.readFileSync('/home/ilya/Documents/projects/otch/selfsigned.crt');
const ca = fs.readFileSync('/home/ilya/Documents/projects/otch/ca.key')
const options = {
    key: key,
    cert: cert,
    ca: ca
};


const server = https.createServer(options, app);

expressWs(app, server);

module.exports = {
    app: app,
    express: express,
    logger: logger,
    server: server,
    expressWs: expressWs,
    passport: passport
};
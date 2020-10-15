const { logLevel } = require('./vars');
const express = require('express');
const app = express();
const path = require('path');
const { morgan, accessLogStream } = require('./log');
const { cors } = require('./cors');

const https = require('https');
const fs = require('fs');

const paths = require('./paths');

const expressWs = require('express-ws');
const expressSession = require('express-session');

const pino = require('pino');
const expressPino = require('express-pino-logger');

const bodyParser = require('body-parser');
const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger });

const { passport, session } = require('./passport');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  paths.files.avatars);
    },
    filename: (req, file, cb) => {
        const extArr = file.mimetype.split('/');
        const extension = extArr[extArr.length - 1];
        cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${extension}`);
    }
});
var upload = multer({ storage: storage });

app.use(expressLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors);
app.use(morgan('combined', {stream: accessLogStream}));


const key = fs.readFileSync(paths.ssl.key);
const cert = fs.readFileSync(paths.ssl.cert);
const ca = fs.readFileSync(paths.ssl.ca);
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
    passport: passport,
    upload: upload
};
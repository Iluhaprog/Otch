const { logLevel } = require('./vars');
require('dotenv').config();
const express = require('express');
const app = express();
const { morgan, accessLogStream } = require('./log');
const  { shouldSendSameSiteNone } = require('should-send-same-site-none');

const paths = require('./paths');

const expressWs = require('express-ws')(app);
const expressSession = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(expressSession);
const redisClient = redis.createClient(process.env.REDIS_URL);

const pino = require('pino');
const expressPino = require('express-pino-logger');

const bodyParser = require('body-parser');
const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger });

const { passport } = require('./passport');

const multer = require('multer');
const multerDbx = require('multer-dropbox');
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');

const dbx = new Dropbox({
    accessToken: process.env.DROP_BOX_TOKEN,
    fetch,
});

const storage = multerDbx( dbx, {
    path: function(req, file, cb) {
        const fileNameSubstings = file.originalname.split('.');
        const fileExtension = fileNameSubstings[fileNameSubstings.length - 1];
        const fileName = fileNameSubstings.filter((substr, index) => {
            return index < fileNameSubstings.length - 1 ? substr : '';
        }).join().split(' ').join();
        const date = Date.now().toLocaleString().split(',').join();

        cb(null, `/uploads/${fileName}-${date}.${fileExtension}`);
    },
    mute: true
});

var upload = multer({ storage: storage });

app.use(expressLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(shouldSendSameSiteNone);

app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    unset: 'destroy',
    cookie: {
        maxAge: 60*60*24*365,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    },
}));

app.enable('trust proxy');

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined', { stream: accessLogStream }));

module.exports = {
    app: app,
    express: express,
    logger: logger,
    expressWs: expressWs,
    passport: passport,
    upload: upload
};
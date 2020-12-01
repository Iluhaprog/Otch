const { logLevel } = require('./vars');
const express = require('express');
const app = express();
const path = require('path');
const { morgan, accessLogStream } = require('./log');

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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, paths.files.avatars);
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
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    unset: 'destroy',
    cookie: {
        maxAge: 60*60*24*365,
        httpOnly: true,
    },
}));

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
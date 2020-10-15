let FileStreamRotator = require('file-stream-rotator')
let fs = require('fs');
let morgan = require('morgan');
let path = require('path');

const logDir = path.join(__dirname, '../../logs/');
fs.existsSync(logDir) || fs.mkdirSync(logDir);

const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
});

module.exports = {
    morgan: morgan,
    accessLogStream: accessLogStream,
};
let cors = require('cors');

var whitelist = ['http://192.168.100.5:3001'];

var corsOptions = {
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "HEAD", "PATCH", "DELETE"],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = { cors: cors(corsOptions) };
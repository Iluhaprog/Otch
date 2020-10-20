let cors = require('cors');

var whitelist = ['http://127.0.0.1:5500', 'https://localhost:3001'];

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
      
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = { cors: cors(corsOptions) };
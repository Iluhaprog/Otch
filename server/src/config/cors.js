let cors = require('cors');

var whitelist = ['http://localhost:3001', 'http://192.168.100.5:3001'];
 
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
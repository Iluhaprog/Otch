let cors = require('cors');

var whitelist = ['http://otch.herokuapp.com', 'http://otch-server.herokuapp.com'];
  
var corsOptions = {
  credentials: true,
  origin: true
}

module.exports = {
    db: {
        host: 'eu-cdbr-west-03.cleardb.net',
        user: 'b75c790d84d8c2',
        password: '5f9ac8ba',
        database: 'heroku_2a79b42d4f668ed',
        connectionLimit : 30,
        charset: 'utf8'
    },
    cors: cors(corsOptions)
}
const { port, env } = require('./config/vars');
const { app } = require('./config/express');
const MessagesRouter = require('./routes/MessagesRoutes'); 

app.use('/messages', MessagesRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

if (env === 'test') {
  module.exports.app = app;
}
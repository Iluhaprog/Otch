const { port, env } = require('./config/vars');
const { app, express, passport } = require('./config/express');
const MessagesRouter = require('./routes/MessagesRoutes'); 
const UsersRoutes = require('./routes/UsersRoutes');
const ChatsController = require('./controllers/ChatsController');

app.use(express.static(__dirname + '/public'));
app.use('/messages', passport.authenticate('local'), MessagesRouter);
app.use('/users', UsersRoutes);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

if (env === 'test') {
  module.exports.app = app;
}
const { port, env } = require('./config/vars');
const { app, express, passport, https, options } = require('./config/express');

const MessagesRouter = require('./routes/MessagesRoutes'); 
const UsersRoutes = require('./routes/UsersRoutes');
const ChatsRoutes = require('./routes/ChatsRoutes');

const ErrorsController = require('./controllers/ErrorsController');

app.use(express.static(__dirname + '/public'));

app.use('/messages', passport.authenticate('local'), MessagesRouter);
app.use('/users', UsersRoutes);
app.use('/chats', passport.authenticate('local'), ChatsRoutes);

app.use(ErrorsController.error404);
app.use(ErrorsController.error500);

const server = https.createServer(options, app);

server.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});

if (env === 'test') {
  module.exports.app = app;
}
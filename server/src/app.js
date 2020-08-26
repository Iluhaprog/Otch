const { port, env } = require('./config/vars');
const { app, express, passport, server } = require('./config/express');


const MessagesRouter = require('./routes/MessagesRoutes'); 
const UsersRoutes = require('./routes/UsersRoutes');
const ChatsRoutes = require('./routes/ChatsRoutes');
const NotificationsRoutes = require('./routes/NotificationsRoutes');

const ErrorsController = require('./controllers/ErrorsController');

app.use(express.static(__dirname + '/public'));

app.use('/messages', MessagesRouter);
app.use('/users', UsersRoutes);
app.use('/chats', ChatsRoutes);
app.use('/notifications', NotificationsRoutes);

app.use(ErrorsController.error404);
app.use(ErrorsController.error500);

server.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});

if (env === 'test') {
  module.exports.app = app;
}
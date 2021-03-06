const { port, env } = require('./config/vars');
const { app, express, passport } = require('./config/express');

let { cors } = require('./config/cors');

if (process.env.NODE_ENV !== 'production') {
  const { cors: crs } = require('./config/cors');
  cors = crs;
} else {
  const { cors: crs } = require('./config/prod_config');
  cors = crs;
}


const MessagesRouter = require('./routes/MessagesRoutes'); 
const UsersRoutes = require('./routes/UsersRoutes');
const ChatsRoutes = require('./routes/ChatsRoutes');
const NotificationsRoutes = require('./routes/NotificationsRoutes');
const VerificationsRoutes = require('./routes/VerificationRoutes');

const ErrorsController = require('./controllers/ErrorsController');

app.use(express.static(__dirname + '/public'));

app.use('/messages', cors, MessagesRouter);
app.use('/users', cors, UsersRoutes);
app.use('/chats', cors, ChatsRoutes);
app.use('/notifications', passport.authenticate('basic'), NotificationsRoutes);
app.use('/verification', cors, VerificationsRoutes);

app.use(ErrorsController.error404);
app.use(ErrorsController.error500);

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});

if (env === 'test') {
  module.exports.app = app;
}
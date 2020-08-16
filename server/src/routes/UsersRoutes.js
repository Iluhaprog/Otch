const { express, passport } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .get('/logout', UsersController.logout)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('local') ,UsersController.login)
    .put('/update', passport.authenticate('local'), UsersController.update);

module.exports = router; 
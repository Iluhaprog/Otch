const { express, passport } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('local') ,UsersController.login);

module.exports = router; 
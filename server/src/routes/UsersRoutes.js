const { express, passport } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .get('/logout', UsersController.logout)
    .get('/getById', passport.authenticate('local'), UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('local') ,UsersController.login)
    .put('/update', passport.authenticate('local'), UsersController.update)
    .delete('/delete', passport.authenticate('local'), UsersController.deleteById);

module.exports = router; 
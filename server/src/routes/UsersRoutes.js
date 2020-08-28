const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .get('/logout', UsersController.logout)
    .get('/getById', passport.authenticate('basic'), UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('basic') ,UsersController.login)
    .put('/update', passport.authenticate('basic'), UsersController.update)
    .post('/updateAvatar', [upload.single('avatar'), passport.authenticate('basic')], UsersController.updateAvatar)
    .delete('/delete', passport.authenticate('basic'), UsersController.deleteById);

module.exports = router; 
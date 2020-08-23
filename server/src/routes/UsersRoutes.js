const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .get('/logout', UsersController.logout)
    .get('/getById', passport.authenticate('local'), UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('local') ,UsersController.login)
    .put('/update', passport.authenticate('local'), UsersController.update)
    .post('/updateAvatar', [upload.single('avatar'), passport.authenticate('local')], UsersController.updateAvatar)
    .delete('/delete', passport.authenticate('local'), UsersController.deleteById);

module.exports = router; 
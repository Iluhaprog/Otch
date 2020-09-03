const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const { checkUser } = require('../filters/UserFilter');

router
    .get('/logout', UsersController.logout)
    .get('/getById', [ passport.authenticate('basic'), checkUser('id') ], UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('basic') , UsersController.login)
    .put('/update', [ passport.authenticate('basic'), checkUser('id') ], UsersController.update)
    .post('/updateAvatar', [ upload.single('avatar'), passport.authenticate('basic'), checkUser('id') ], UsersController.updateAvatar)
    .delete('/delete', [ passport.authenticate('basic'), checkUser('id') ], UsersController.deleteById);

module.exports = router; 
const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const { checkUser } = require('../filters/UserFilter');
const { authenticateMd } = require('../filters/Authenticate');


router
    .get('/logout', UsersController.logout)
    .get('/search', UsersController.search)
    .get('/getById', [ authenticateMd(), checkUser('id') ], UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('basic') , UsersController.login)
    .put('/update', [ authenticateMd(), checkUser('id') ], UsersController.update)
    .put('/updatePassword', authenticateMd(), checkUser('id'), UsersController.updatePassword)
    .post('/updateAvatar', [ upload.single('avatar'), authenticateMd(), checkUser('id') ], UsersController.updateAvatar)
    .delete('/delete', [ passport.authenticate('basic'), checkUser('id') ], UsersController.deleteById);

module.exports = router; 
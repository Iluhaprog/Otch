const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const Answer = require('../libs/Answer');
const { FAILURE } = require('../libs/statuses');

const md = async (req, res, next) => {
    const user = req.user;
    const reqId = req.body.id || req.query.id || req.body.user.id;
    if (parseInt(user.id) === parseInt(reqId)) {
        next();
    } else {
        res.json(new Answer(FAILURE, {message: 'Unauthorized'}));
    }
};

router
    .get('/logout', UsersController.logout)
    .get('/getById', [ passport.authenticate('basic'), md ], UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('basic') , UsersController.login)
    .put('/update', [ passport.authenticate('basic'), md ], UsersController.update)
    .post('/updateAvatar', [ upload.single('avatar'), passport.authenticate('basic'), md ], UsersController.updateAvatar)
    .delete('/delete', [ passport.authenticate('basic'), md ], UsersController.deleteById);

module.exports = router; 
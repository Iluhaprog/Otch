const { authenticate } = require('passport');
const { express, passport, upload } = require('../config/express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const { checkUser } = require('../filters/UserFilter');

const authenticateMd = () => {
    return (req, res, next) => {
        passport.authenticate('basic', function(err, user, info){
            if(err) return console.log(err);

            if(!user){
                res.set('WWW-Authenticate', 'x'+info);
                return res.status(401).json({});
            }
            
        });
        next();
    }
}


router
    .get('/logout', UsersController.logout)
    .get('/getById', [ authenticateMd(), checkUser('id') ], UsersController.getById)
    .post('/registration', UsersController.registration)
    .post('/login', passport.authenticate('basic') , UsersController.login)
    .put('/update', [ passport.authenticate('basic'), checkUser('id') ], UsersController.update)
    .post('/updateAvatar', [ upload.single('avatar'), authenticateMd(), checkUser('id') ], UsersController.updateAvatar)
    .delete('/delete', [ passport.authenticate('basic'), checkUser('id') ], UsersController.deleteById);

module.exports = router; 
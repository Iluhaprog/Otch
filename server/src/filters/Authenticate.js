const { passport } = require('../config/express');

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

module.exports = {
    authenticateMd: authenticateMd,
};
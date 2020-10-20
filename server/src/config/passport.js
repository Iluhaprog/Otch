const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const UsersService = require('../services/UserService');
const { compare } = require('../libs/crypt');

const isEmpty = obj => {
    for (let key in obj) {
        return false;
    }
    return true;
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UsersService.getById(id);
    done(null, user);
});

passport.use(new BasicStrategy({
        realm: 'Fuuuuuuuk you!',
    },
    async (username, password, done) => {
        let user;
        if (username.includes('@')) {
            user = (await UsersService.getByEmail(username)).getData();
        } else {
            user = (await UsersService.getByLogin(username)).getData();
        }
        
        if (!isEmpty(user)) {
            if (compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } else {
            done(null, false, {message: 'User not exist'});
        }
    }
));

module.exports = {
    passport: passport
}

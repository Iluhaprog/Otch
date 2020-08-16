const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersService = require('../services/UserService');
const { compare } = require('../libs/crypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UsersService.getById(id);
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        const user = await UsersService.getByEmail(username);
        console.log(compare(password, user.password));
        if (!user) {
            return done(null, false, {message: 'User does not exist'});
        }
        if (compare(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Invalid password'});
        }
    }
));

module.exports = {
    passport: passport
}

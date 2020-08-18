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
        const user = (await UsersService.getByEmail(username)).getData();
        if (Object.keys(user).length === 0) {
            return done(null, false);
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

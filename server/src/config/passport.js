const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const UsersService = require('../services/UserService');
const { compare } = require('../libs/crypt');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UsersService.getById(id);
    done(null, user);
});

passport.use(new BasicStrategy(
    async (username, password, done) => {
        console.log(username, ' --- ', password);
        let user = '';
        if (username.includes('@')) {
            user = (await UsersService.getByEmail(username)).getData();
        } else {
            user = (await UsersService.getByLogin(username)).getData();
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

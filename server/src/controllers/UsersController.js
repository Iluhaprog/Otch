const UsersService = require('../services/UserService');

class UsersController {

    async registration(req, res) {
        const user = req.body.user;
        const result = await UsersService.create(user);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }

    async login(req, res) {
        res.send('login');
    }

    async logout(req, res)  {
        req.logout();
        res.json({logout: true});
    }

    async update(req, res) {
        const user = req.body.user;
        const result = await UsersService.update(user);
        res.json(result);
    }

}

module.exports = new UsersController();
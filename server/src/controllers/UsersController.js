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

    async updateAvatar(req, res) {
        const user = {
            id: req.query.id,
            avatarName: req.file.filename
        };
        const result = await UsersService.updateAvatar(user);
        res.json(result);
    }

    async update(req, res) {
        const user = req.body.user;
        const result = await UsersService.update(user);
        res.json(result);
    }

    async getById(req, res) {
        const id = req.body.id;
        const result = await UsersService.getById(id);
        res.json(result);
    }

    async deleteById(req, res) {
        const id = req.body.id;
        const result = await UsersService.deleteById(id);
        res.json(result);
    }

}

module.exports = new UsersController();
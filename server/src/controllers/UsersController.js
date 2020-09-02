const UsersService = require('../services/UserService');
const Answer = require('../libs/Answer');
const { SUCCESS } = require('../libs/statuses');

class UsersController {

    async registration(req, res) {
        try {
            const user = req.body.user;
            const result = await UsersService.create(user);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async login(req, res) {
        try {
            res.json(new Answer(SUCCESS, {userId: req.user.id}));
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async logout(req, res)  {
        try {
            req.logout();
            res.json({logout: true});
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async updateAvatar(req, res) {
        try {
            const user = {
                id: req.query.id,
                avatarName: req.file.filename
            };
            const result = await UsersService.updateAvatar(user);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async update(req, res) {
        try {
            const user = req.body.user;
            const result = await UsersService.update(user);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getById(req, res) {
        try {
            const id = req.body.id;
            const result = await UsersService.getById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async deleteById(req, res) {
        try {
            const id = req.body.id;
            const result = await UsersService.deleteById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

}

module.exports = new UsersController();
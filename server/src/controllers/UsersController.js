const UsersService = require('../services/UserService');
const { SUCCESS, EMAIL_E, LOGIN_E } = require('../libs/userCreateStatuses');

class UsersController {

    async registration(req, res) {
        const user = req.body.user;
        const result = await UsersService.create(user);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        if (result.status === SUCCESS) {
            res.json({status: SUCCESS});
        } else if(result.status === EMAIL_E) {
            res.json({status: EMAIL_E});
        } else if(result.status === LOGIN_E) {
            res.json({status: LOGIN_E});
        } else {
            res.json({status: 0});
        }
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
        if (result) {
            res.json({updated: true});
        } else {
            res.json({updated: false});
        }
    }

}

module.exports = new UsersController();
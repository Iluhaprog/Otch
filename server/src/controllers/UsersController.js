const UsersService = require('../services/UserService');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');
const FileManager = require('../libs/FileManager');
const paths = require('../config/paths');

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
                avatarName: req.file && req.file.name
            };
            let result = new Answer(FAILURE);
            FileManager.download(paths.files.avatars, user.avatarName, async () => {
                result = await UsersService.updateAvatar(user);
                res.json(result);
            });
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

    async updatePassword(req, res) {
        try {
            const {id, oldPassword, newPassword} = req.body;
            const result = await UsersService.updatePassword(id, oldPassword, newPassword);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.query;
            const result = await UsersService.getById(id);
            if (result.data.avatar_image) {
                FileManager.download(paths.files.avatars, result.data.avatar_image, async () => {
                    result.data.avatar_image = '/avatars/' + result.data.avatar_image;
                    res.json(result);
                });
            } else {
                res.json(result);
            }
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

    async search(req, res) {
        try {
            const { q, l, o } = req.query;
            const result = await UsersService.searchByName(q, l, o);
            new Promise((res, rej) => {
                let lastStream = null;
                result.data.forEach(user => {
                    if (user.avatar_image) {
                        lastStream = FileManager.download(paths.files.avatars, user.avatar_image);
                        user.avatar_image = '/avatars/' + user.avatar_image;
                    }
                });
                if (lastStream) lastStream.on('end', () => res());
                else res();
            }).then(() => res.json(result));
        } catch(err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

}

module.exports = new UsersController();
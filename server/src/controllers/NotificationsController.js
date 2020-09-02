const NotificationsService = require('../services/NotificationsService');

class NotificationsController {

    async getById(req, res) {
        try {
            const id = req.body.id;
            const result = await NotificationsService.getById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getByUserId(req, res) {
        try {
            const userId = req.body.userId;
            const result = await NotificationsService.getByUserId(userId);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async create(req, res) {
        try {
            const notification = req.body.notification;
            const result = await NotificationsService.create(notification);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async update(req, res) {
        try {
            const notification = req.body.notification;
            const result = await NotificationsService.update(notification);
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
            const result = await NotificationsService.deleteById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

}

module.exports = new NotificationsController();
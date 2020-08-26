const NotificationsService = require('../services/NotificationsService');

class NotificationsController {

    async getById(req, res) {
        const id = req.body.id;
        const result = await NotificationsService.getById(id);
        res.json(result);
    }

    async getByUserId(req, res) {
        const userId = req.body.userId;
        const result = await NotificationsService.getByUserId(userId);
        res.json(result);
    }

    async create(req, res) {
        const notification = req.body.notification;
        const result = await NotificationsService.create(notification);
        res.json(result);
    }

    async update(req, res) {
        const notification = req.body.notification;
        const result = await NotificationsService.update(notification);
        res.json(result);
    }

    async deleteById(req, res) {
        const id = req.body.id;
        const result = await NotificationsService.deleteById(id);
        res.json(result);
    }

}

module.exports = new NotificationsController();
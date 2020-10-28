const ChatsService = require('../services/ChatService');

class ChatsController {

    async getById(req, res) {
        try {
            const id = req.body.id;
            const result = await ChatsService.getById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getByKey(req, res) {
        try {
            const key = req.body.key;
            const result = await ChatsService.getByKey(key);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getByUserId(req, res) {
        try {
            const userId = req.query.userId;
            const result = await ChatsService.getByUserId(userId);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async create(req, res) {
        try {
            const chat = {
                adminId: req.body.adminId,
                name: req.body.name,
                avatar: req.file && req.file.filename,
            }
            const result = await ChatsService.create(chat);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async addMember(req, res) {
        try {
            const { adminId, memberId, key } = req.body;
            console.log(req.body);
            const result = await ChatsService.addMember(adminId, memberId, key);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async deleteMember(req, res) {
        try {
            const { adminId, memberId, key } = req.body;
            const result = await ChatsService.deleteMember(adminId, memberId, key);
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
            const result = await ChatsService.deleteById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

}

module.exports = new ChatsController();
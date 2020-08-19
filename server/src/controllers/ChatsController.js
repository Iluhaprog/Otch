const ChatsService = require('../services/ChatService');

class ChatsController {

    async getById(req, res) {
        const id = req.body.id;
        const result = await ChatsService.getById(id);
        res.json(result);
    }

    async getByKey(req, res) {
        const key = req.body.key;
        const result = await ChatsService.getByKey(key);
        res.json(result);
    }

    async getByUserId(req, res) {
        const userId = req.body.userId;
        const result = await ChatsService.getByUserId(userId);
        res.json(result);
    }

    async create(req, res) {
        const chat = req.body.chat;
        const result = await ChatsService.create(chat);
        res.json(result);
    }

    async addMember(req, res) {
        const { memberId, key } = req.body;
        const result = await ChatsService.addMember(memberId, key);
        res.json(result);
    }

    async deleteById(req, res) {
        const id = req.body.id;
        const result = await ChatsService.deleteById(id);
        res.json(result);
    }

}

module.exports = new ChatsController();
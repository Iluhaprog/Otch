const MessagesService = require('../services/MessagesService');

class MessagesController {

    async getById(req, res) {
        try {
            const id = req.body.id;
            const message = await MessagesService.getById(id);
            res.json(message);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getByChatId(req, res) {
        try {
            const chatId = req.body.chatId;
            const messages = await MessagesService.getByChatId(chatId);
            res.json(messages);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async getByUserIdAndChatId(req, res) {
        try {
            const { userId, chatId } = req.body;
            const messages = await MessagesService.getByUserIdAndChatId(userId, chatId);
            res.json(messages);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async create(message) {
        const result = await MessagesService.create(message);
        return result;
    }

    async update(message) {
        const result = await MessagesService.updateById(message.id, message.message);
        return result;
    }

    async deleteById(message) {
        const result = await MessagesService.deleteById(message.id);
        return result;
    }

    async createFile(data) {
        const result = await MessagesService.createFile(data);
        return result;
    }
}

module.exports = new MessagesController();
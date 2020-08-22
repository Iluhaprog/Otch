const MessagesService = require('../services/MessagesService');

class MessagesController {

    async getById(req, res) {
        const id = req.body.id;
        const message = await MessagesService.getById(id);
        res.json(message);
    }

    async getByChatId(req, res) {
        const chatId = req.body.chatId;
        const messages = await MessagesService.getByChatId(chatId);
        res.json(messages);
    }

    async getByUserIdAndChatId(req, res) {
        const { userId, chatId } = req.body;
        const messages = await MessagesService.getByUserIdAndChatId(userId, chatId);
        res.json(messages);
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

    async createFile(buffer) {
        const result = await MessagesService.createFile(buffer);
        return result;
    }
}

module.exports = new MessagesController();
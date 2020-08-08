const MessagesService = require('../services/MessagesService');

class MessagesController {

    async getById(req, res) {
        const id = req.body.id;
        const message = await MessagesService.getById(id);
        res.json(message);
    }

    async getByChatId(req, res) {
        const chat_id = req.body.chat_id;
        const messages = await MessagesService.getByChatId(chat_id);
        res.json(messages);
    }

    async getByUserIdAndChatId(req, res) {
        const { user_id, chat_id } = req.body;
        const messages = await MessagesService.getByUserIdAndChatId(user_id, chat_id);
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
}

module.exports = new MessagesController();
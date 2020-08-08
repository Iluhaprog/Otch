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
        res.json(message);
    }

    async create(req, res) {
        const message = req.body.message;
        const result = await MessagesService.create(message);
        if (result) {
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    }

    async update(req, res) {
        const message = req.body.message;
        const result = await MessagesService.updateById(message.id, message.message);
        if (result) {
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    }

    async deleteById(req, res) {
        const message = req.body.message;
        const result = await MessagesService.deleteById(message.id);
        if (result) {
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
    }
}

module.exports = new MessagesController();
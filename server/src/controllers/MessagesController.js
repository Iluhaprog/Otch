const Answer = require('../libs/Answer');
const { FAILURE } = require('../libs/statuses');
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
        try {
            const result = await MessagesService.create(message);
            return result;
        } catch (err) {
            return new Answer(FAILURE, {message: 'Error'})
        }
    }

    async update(message) {
        try {
            const result = await MessagesService.updateById(message.id, message.message);
            return result;
        } catch (err) {
            return new Answer(FAILURE, {message: 'Error'})
        }
    }

    async deleteById(message) {
        try { 
            const result = await MessagesService.deleteById(message.id);
            return result;
        } catch (err) {
            return new Answer(FAILURE, {message: 'Error'})
        }
    }

    async createFile(data) {
        try {
            const result = await MessagesService.createFile(data);
            return result;
        } catch (err) {
            return new Answer(FAILURE, {message: 'Error'})
        }
    }
}

module.exports = new MessagesController();
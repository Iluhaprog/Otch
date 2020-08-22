const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
const { token } = require('../libs/crypt');
const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');

class MessagesService {

    /**
     * Return message by id
     * 
     * @param {number} id
     * @returns {Answer} If message exist, then Answer contains status SUCCESS and data is message, otherwise status FAILURE and data is empty
     */
    async getById(id) {
        const [[message]] = await query('SELECT * FROM Messages WHERE id=?', [id]);
        return message ? new Answer(SUCCESS, message) : new Answer(FAILURE);
    }

    /**
     * Return all messages of chat
     * 
     * @param {number} chatId 
     * @returns {Answer} If messages exist, then Answer contains status SUCCESS and data is messages, otherwise status FAILURE and data is empty
     */
    async getByChatId(chatId) {
        const [messages] = await query('SELECT * FROM Messages WHERE chat_id=?', [chatId]);
        return messages ? new Answer(SUCCESS, messages) : new Answer(FAILURE);
    }

    /**
     * Return all messages of user in chat 
     * 
     * @param {number} userId 
     * @param {number} chatId 
     * @returns {Answer} If messages exist, then Answer contains status SUCCESS and data is messages, otherwise status FAILURE and data is empty
     */
    async getByUserIdAndChatId(userId, chatId) {
        const [messages] = await query('SELECT * FROM Messages WHERE user_id=? and chat_id=?', [userId, chatId]);
        return messages ? new Answer(SUCCESS, messages) : new Answer(FAILURE);
    }

    /**
     * Create message
     * 
     * @param {Object} message
     * @param {number} message.userId
     * @param {number} message.chatId
     * @param {string} message.message
     * @param {Date} message.creationDate
     * @return {Answer} If message created, then Answer contains status SUCCESS, otherwise FAILURE
     */
    async create(message) {
        if (message) {
            const creationDate = message.creationDate || new Date();
            await query(`INSERT INTO Messages(\`user_id\`, \`chat_id\`, \`message\`, \`creation_date\`) VALUES
                            (?, ?, ?, ?)`,
                        [message.userId, message.chatId, message.message, formatDate(creationDate)]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Update message
     * 
     * @param {number} id 
     * @param {string} newMessage 
     * @return {Answer} If message updated, then Answer contains status SUCCESS, otherwise FAILURE
     */
    async updateById(id, newMessage) {
        const message = await this.getById(id);
        if (message.getStatus()) {
            await query('UPDATE Messages SET message=? WHERE id=?', [newMessage, id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete message
     * 
     * @param {number} id
     * @return {Answer} If message deleted, then Answer contains status SUCCESS, otherwise FAILURE
     */
    async deleteById(id) {
        const message = await this.getById(id);
        if(message.getStatus()) {
            await query('DELETE FROM Messages WHERE id=?', [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Create image from buffer
     * 
     * @param {Buffer} buffer
     * @returns {Answer} 
     */
    async createFile(buffer) {
        if (buffer) {
            const ext = (await FileType.fromBuffer(buffer)).ext;
            const fileName = `${token()}.${ext}`;
            const filePath = path.join(__dirname, '/../public/', fileName);
            fs.writeFile(filePath, buffer, 'binary', (err) => {
                if (err) throw err;
            });
            return new Answer(SUCCESS, {path: fileName});
        }
        return new Answer(FAILURE);
    }
}

module.exports = new MessagesService();
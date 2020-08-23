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
     * Create file data in database
     * 
     * @param {Object} file 
     * @param {string} file.name
     * @param {number} file.userId
     * @param {number} file.chatId
     * @param {string} file.creationDate
     * @returns {Answer} If file created, then Answer status SUCCESS, otherwise status FAILURE
     */
    async createFileInDB(file) {
        if (file) {
            await query(`INSERT INTO Files(\`name\`, \`user_id\`, \`chat_id\`, \`creation_date\`) VALUES (?, ?, ?, ?)`,
                    [file.name, file.userId, file.chatId, file.creationDate]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Create file
     * 
     * @param {Object} data
     * @param {number} data.userId
     * @param {number} data.chatId
     * @param {Buffer} data.message
     * @returns {Answer}  If file created, then Answer status SUCCESS and data contains path to file, otherwise status FAILURE
     */
    async createFile(data) {
        if (data.message) {
            const ext = (await FileType.fromBuffer(data.message)).ext;
            const fileName = `${token()}.${ext}`;
            const filePath = path.join(__dirname, '/../public/', fileName);
            fs.writeFile(filePath, data.message, 'binary', (err) => {
                if (err) throw err;
            });
            const result = await this.createFileInDB({
                name: fileName,
                userId: data.userId,
                chatId: data.chatId,
                creationDate: formatDate(new Date())
            });
            return result.status ? new Answer(SUCCESS, {path: fileName}) : new Answer(FAILURE);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new MessagesService();
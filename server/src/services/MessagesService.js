const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
const { token } = require('../libs/crypt');
const query = require('../libs/connection');
const { formatDate } = require('../libs/format');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');
const paths = require('../config/paths');

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
     * Return messages with files by chatId
     * 
     * @param {number} chatId 
     * @return {Array} array of messages
     */
    async getMessagesWithFilesByChatId(chatId) {
        const [messages] = await query(`
                    select 
                        Users.name, 
                        Files.name as path, 
                        Messages.* 
                    from Messages 
                    inner join Users on Users.id=Messages.user_id 
                    inner join Files on Messages.id=Files.message_id 
                    where Messages.chat_id=?
        `, [chatId]);
        return messages;
    }

    /**
     * Return all messages of chat
     * 
     * @param {number} chatId 
     * @returns {Answer} If messages exist, then Answer contains status SUCCESS and data is messages, otherwise status FAILURE and data is empty
     */
    async getByChatId(chatId) {
        const [messages] = await query('select Users.name, Messages.* from Messages inner join Users on Users.id=Messages.user_id where chat_id=?', [chatId]);
        const messagesWithFiles = await this.getMessagesWithFilesByChatId(chatId);
        for (let i = 0; i < messages.length; i++) {
            for (let j = 0; j < messagesWithFiles.length; j++) {
                if (messages[i].id === messagesWithFiles[j].id) {
                    messages[i] = messagesWithFiles[j];
                }
            }
        }
        messages.sort((a, b) => {
            if (a && b) {
                const time1 = new Date(a.creation_date).getTime();
                const time2 = new Date(b.creation_date).getTime();
                return time1 - time2;
            }
        });
    
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
            const [[result]] = await query(`SELECT insertMessage(?, ?, ?, ?) as last_id`,
                        [message.userId, message.chatId, message.message, formatDate(creationDate)]);
            return new Answer(SUCCESS, result);
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
            await query(`INSERT INTO Files(\`name\`, \`user_id\`, \`chat_id\`, \`creation_date\`, \`message_id\`) 
                            VALUES (?, ?, ?, ?, ?)`,
                    [file.name, file.userId, file.chatId, file.creationDate, file.messageId]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Create file in file system
     * 
     * @param {Buffer} buffer 
     * @returns {string} Name of created file
     */
    async createFileInFS(buffer) {
        const ext = (await FileType.fromBuffer(buffer)).ext;
        const fileName = `${token()}.${ext}`;
        const filePath = path.join(paths.files.chats, fileName);
        fs.writeFile(filePath, buffer, 'binary', (err) => {
            if (err) throw err;
        });
        return fileName;
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
            const fileName = await this.createFileInFS(data.message);
            const result = await this.createFileInDB({
                name: paths.files.chatsResp + fileName,
                userId: data.userId,
                chatId: data.chatId,
                messageId: data.messageId,
                creationDate: formatDate(new Date())
            });
            return result.status ? new Answer(SUCCESS, {path: fileName}) : new Answer(FAILURE);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new MessagesService();
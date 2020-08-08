const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');

class MessagesService {

    /**
     * Return message by id
     * 
     * @param {number} id
     * @returns {Objects} message
     */
    async getById(id) {
        const [message] = await query('SELECT * FROM Messages WHERE id=?', [id]);
        return message || null;
    }

    /**
     * Return all messages of chat
     * 
     * @param {number} chat_id 
     * @returns {Array} array of messages
     */
    async getByChatId(chat_id) {
        const [messages] = await query('SELECT * FROM Messages WHERE chat_id=?', [chat_id]);
        return messages || null;
    }

    /**
     * Return all messages of user in chat 
     * 
     * @param {number} user_id 
     * @param {number} chat_id 
     * @returns {Array} array of messages 
     */
    async getByUserIdAndChatId(user_id, chat_id) {
        const [messages] = await query('SELECT * FROM Messages WHERE user_id=? and chat_id=?', [user_id, chat_id]);
        return messages || null;
    }

    /**
     * Create message
     * 
     * @param {Object} message
     * @param {number} message.user_id
     * @param {number} message.chat_id
     * @param {string} message.message
     * @param {Date} message.creation_date
     * @return {boolean} true - message created, false - message don't created
     */
    async create(message) {
        if (message) {
            const creation_date = message.creation_date || new Date();
            await query(`INSERT INTO Messages(\`user_id\`, \`chat_id\`, \`message\`, \`creation_date\`) VALUES
                            (?, ?, ?, ?)`,
                        [message.user_id, message.chat_id, message.message, formatDate(creation_date)]);
            return true;
        }
        return false;
    }

    /**
     * Update message
     * 
     * @param {number} id 
     * @param {string} newMessage 
     * @return {boolean} true - message updated, false - message don't updated
     */
    async updateById(id, newMessage) {
        const message = await this.getById(id);
        if (message) {
            await query('UPDATE Messages SET message=? WHERE id=?', [newMessage, id]);
            return true;
        }
        return false;
    }

    /**
     * Delete message
     * 
     * @param {number} id
     * @return {boolean} true - message deleted, false - message don't deleted
     */
    async deleteById(id) {
        const message = await this.getById(id);
        if(message) {
            await query('DELETE FROM Messages WHERE id=?', [id]);
            return true;
        }
        return false;
    }

}

module.exports = new MessagesService();
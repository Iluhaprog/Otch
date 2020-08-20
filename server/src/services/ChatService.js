const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');
const { token } = require('../libs/crypt');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE, NOT_CHAT_ADMIN } = require('../libs/statuses');

class ChatService {


    /**
     * Return chat by id
     * 
     * @param {number} id id of chat 
     * @returns {Answer} If chat exist, then Answer contains status SUCCESS and data is chat, otherwise status FAILURE and data is empty 
     */
    async getById(id) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE id=?', [id]);
        return chat ? new Answer(SUCCESS, chat) : new Answer(FAILURE);
    }

    /**
     * Return chat by key
     * 
     * @param {string} key key of chat
     * @returns {Answer} If chat exist, then Answer contains status SUCCESS and data is chat, otherwise status FAILURE and data is empty 
     */
    async getByKey(key) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE `key`=?', [key]);
        return  chat ? new Answer(SUCCESS, chat) : new Answer(FAILURE);
    }

    /**
     * Return array of user chats by user id
     * 
     * @param {number} userId
     * @returns {Answer} If chats exist, then Answer contains status SUCCESS and data is chats, otherwise status FAILURE and data is empty 
     */
    async getByUserId(userId) {
        const [chats] = await query(`
            SELECT Chats.id, Chats.name, Chats.creation_date, Chats.key  
                FROM Chats
                JOIN Users_Chats
                    ON Users_Chats.chat_id = Chats.id
                JOIN Users
                    ON Users.id = Users_Chats.user_id WHERE Users.id = ?;
            `, 
            [userId]);
        return chats.length ? new Answer(SUCCESS, chats) : new Answer(FAILURE);
    }

    /**
     * Create chat
     * 
     * @param {Object} chat
     * @param {number} chat.adminId
     * @param {string} chat.name name of chat
     * @param {Date} chat.creation_date
     * @returns {Answer} If chat created, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async create(chat) {
        if (chat) {
            const key = token();
            const creation_date = formatDate(chat.creation_date || new Date());
            await query(`
                INSERT INTO Chats(\`name\`, \`creation_date\`, \`key\`, \`admin_id\`) VALUES (?, ?, ?, ?);
                `, 
                [chat.name, creation_date, key, chat.adminId]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Add member to chat
     * 
     * @param {number} adminId
     * @param {number} userId 
     * @param {string} key 
     * @returns {Answer} If member added to chat, then Answer contains status SUCCESS, othewise status NOT_CHAT_ADMIN
     */
    async addMember(adminId, userId, key) {
        let chat = (await this.getByKey(key)).getData();
        if (adminId === chat.admin_id) {
            await query('INSERT INTO Users_Chats(\`user_id\`, \`chat_id\`) VALUE (?, ?)', [userId, chat.id]);
            return new Answer(SUCCESS);
        }
        return new Answer(NOT_CHAT_ADMIN);
    }

    /**
     * Delete member form chat
     * 
     * @param {number} adminId
     * @param {number} userId 
     * @param {string} key
     * @return {Answer} If member deleted, then Answer contains status SUCCESS, otherwise status FAILURE 
     */
    async deleteMember(adminId, userId, key) {
        const chat = (await this.getByKey(key)).getData();
        if (adminId === chat.admin_id || adminId === userId) {
            const chatId = chat.id;
            await query('DELETE FROM Users_Chats WHERE `user_id`=? AND `chat_id`=?', [userId, chatId]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete chat by id
     * 
     * @param {number} id id of chat 
     * @returns {Answer} If chat deleted, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async deleteById(id) {
        const [users] = await query(`
            SELECT Users.id  
                FROM Chats
                JOIN Users_Chats
                    ON Users_Chats.chat_id = Chats.id
                JOIN Users
                    ON Users.id = Users_Chats.user_id
                WHERE Chats.id = ?;
            `, 
            [id]);
        if(!users.length) {
            await query(`DELETE FROM Chats WHERE id=?`, [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new ChatService();
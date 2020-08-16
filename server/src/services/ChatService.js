const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');
const { token } = require('../libs/crypt');

class ChatService {


    /**
     * Return chat by id
     * 
     * @param {number} id id of chat 
     * @returns {Object}
     */
    async getById(id) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE id=?', [id]);
        return chat || null;
    }

    /**
     * Return chat by key
     * 
     * @param {string} key key of chat
     * @returns {Object}
     */
    async getByKey(key) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE `key`=?', [key]);
        return chat || null;
    }

    /**
     * Return array of user chats by user id
     * 
     * @param {number} user_id
     * @returns {Array}
     */
    async getByUserId(user_id) {
        const [chats] = await query(`
            SELECT Chats.id, Chats.name, Chats.creation_date, Chats.key  
                FROM Chats
                JOIN Users_Chats
                    ON Users_Chats.chat_id = Chats.id
                JOIN Users
                    ON Users.id = Users_Chats.user_id WHERE Users.id = ?;
            `, 
            [user_id]);
        return chats;
    }

    /**
     * Create chat
     * 
     * @param {Object} chat
     * @param {string} chat.name name of chat
     * @param {Date} chat.creation_date
     * @returns {Object}
     */
    async create(chat) {
        const key = token();
        const creation_date = formatDate(chat.creation_date) || formatDate(new Date());
        const result = await query(`
            INSERT INTO Chats(\`name\`, \`creation_date\`, \`key\`) VALUES (?, ?, ?);
            `, 
            [chat.name, creation_date, key]);
        return {
            name: chat.name,
            creation_date: creation_date,
            key: key
        };
    }

    /**
     * Add member to chat
     * 
     * @param {number} user_id 
     * @param {string} key 
     * @returns {boolean}
     */
    async addMember(user_id, key) {
        let [[chat_id]] = await query('SELECT Chats.id FROM Chats WHERE `key`=?', [key]);
        chat_id = chat_id.id;
        if (chat_id) {
            await query('INSERT INTO Users_Chats(\`user_id\`, \`chat_id\`) VALUE (?, ?)', [user_id, chat_id]);
            return true;
        }
        return false;
    }

    /**
     * Delete chat by id
     * 
     * @param {number} id id of chat 
     * @returns {boolean}
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
            query(`DELETE FROM Chats WHERE id=?`, [id]);
            return true;
        }
        return false;
    }
}

module.exports = new ChatService();
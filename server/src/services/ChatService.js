const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');
const { token } = require('../libs/crypt');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');

class ChatService {


    /**
     * Return chat by id
     * 
     * @param {number} id id of chat 
     * @returns {Object} chat or null if chat exist
     */
    async getById(id) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE id=?', [id]);
        return chat ? new Answer(SUCCESS, chat) : new Answer(FAILURE);
    }

    /**
     * Return chat by key
     * 
     * @param {string} key key of chat
     * @returns {Object} chat or null if chat exist
     */
    async getByKey(key) {
        const [[chat]] = await query('SELECT * FROM Chats WHERE `key`=?', [key]);
        return  chat ? new Answer(SUCCESS, chat) : new Answer(FAILURE);
    }

    /**
     * Return array of user chats by user id
     * 
     * @param {number} user_id
     * @returns {Array} array of user chats
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
        return chats.length ? new Answer(SUCCESS, chats) : new Answer(FAILURE);
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
        await query(`
            INSERT INTO Chats(\`name\`, \`creation_date\`, \`key\`) VALUES (?, ?, ?);
            `, 
            [chat.name, creation_date, key]);
        return new Answer(SUCCESS);
    }

    /**
     * Add member to chat
     * 
     * @param {number} user_id 
     * @param {string} key 
     * @returns {boolean} true - member was added, false - member not added
     */
    async addMember(user_id, key) {
        let chat = (await this.getByKey(key)).getData();
        chat_id = chat.id;
        if (chat_id) {
            await query('INSERT INTO Users_Chats(\`user_id\`, \`chat_id\`) VALUE (?, ?)', [user_id, chat_id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete chat by id
     * 
     * @param {number} id id of chat 
     * @returns {boolean} true - chat deleted, false - chat don't deleted
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
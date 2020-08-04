const query = require('../libs/connection');
const formatDate = require('../libs/formatDate');
const { token } = require('../libs/crypt');

class ChatService {


    /**
     * 
     * @param {number} id id of chat 
     */
    async getById(id) {
        const [chat] = await query('SELECT * FROM Chats WHERE id=?', [id]);
        return chat;
    }

    /**
     * 
     * @param {number} user_id
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
     * 
     * @param {Object} chat
     * @param {string} chat.name name of chat
     * @param {Date} chat.creation_date
     */
    async create(chat) {
        const key = token();
        const creation_date = formatDate(chat.creation_date) || formatDate(new Date());
        const result = await query(`
            INSERT INTO Chats(\`name\`, \`creation_date\`, \`key\`) VALUES (?, ?, ?);
            `, 
            [chat.name, creation_date, key]);
        return result;
    }

    async addMember(user_id, key) {
        let [chat_id] = await query('SELECT Chats.id FROM Chats WHERE `key`=?', [key]);
        chat_id = chat_id[0].id;
        if (chat_id) {
            const result = await query('INSERT INTO Users_Chats(\`user_id\`, \`chat_id\`) VALUE (?, ?)', [user_id, chat_id]);
            return 'member add';
        }
        return 0;
    }

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
            return 'deleted';
        }
        return `chat has ${users.length} members`;
    }
}

module.exports = new ChatService();
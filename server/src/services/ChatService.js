const query = require('../libs/connection');
const { formatDate } = require('../libs/format');
const { token } = require('../libs/crypt');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE, NOT_CHAT_ADMIN, USER_E } = require('../libs/statuses');
const { CHATS, USERS, USERS_CHATS } = require('../config/db_table_names');
class ChatService {


    /**
     * Return chat by id
     * 
     * @param {number} id id of chat 
     * @returns {Answer} If chat exist, then Answer contains status SUCCESS and data is chat, otherwise status FAILURE and data is empty 
     */
    async getById(id) {
        const [[chat]] = await query(`SELECT * FROM ${CHATS} WHERE id=?`, [id]);
        return chat ? new Answer(SUCCESS, chat) : new Answer(FAILURE);
    }

    /**
     * Return chat by key
     * 
     * @param {string} key key of chat
     * @returns {Answer} If chat exist, then Answer contains status SUCCESS and data is chat, otherwise status FAILURE and data is empty 
     */
    async getByKey(key) {
        const [[chat]] = await query(`SELECT * FROM ${CHATS} WHERE \`key\`=?`, [key]);
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
            SELECT ${CHATS}.id, ${CHATS}.name, ${CHATS}.creation_date, ${CHATS}.key, ${CHATS}.avatar
                FROM ${CHATS}
                JOIN ${USERS_CHATS}
                    ON ${USERS_CHATS}.chat_id = ${CHATS}.id
                JOIN Users
                    ON Users.id = ${USERS_CHATS}.user_id WHERE ${USERS}.id=?;
            `, 
            [userId]);
            console.log(userId);
        return chats.length ? new Answer(SUCCESS, chats) : new Answer(FAILURE);
    }

    /**
     * Create chat
     * 
     * @param {Object} chat
     * @param {number} chat.adminId
     * @param {string} chat.name name of chat
     * @param {string} chat.avatar avatar image of chat
     * @param {Date} chat.creation_date
     * @returns {Answer} If chat created, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async create(chat) {
        if (chat) {
            const key = token();
            const creation_date = formatDate(chat.creation_date || new Date());
            const chatAvatar = chat.avatar ? `/avatars/${chat.avatar}` : '';
            await query(`
                INSERT INTO ${CHATS}(\`name\`, \`avatar\`, \`creation_date\`, \`key\`, \`admin_id\`) VALUES (?, ?, ?, ?, ?);
                `, 
                [chat.name, chatAvatar, creation_date, key, chat.adminId]);
            return new Answer(SUCCESS, {key: key});
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
        let [user] = await query(`select ${USERS}.name  
                                    from ${CHATS}
                                    join ${USERS_CHATS}
                                        on ${USERS_CHATS}.chat_id = ${CHATS}.id
                                    JOIN Users
                                        on ${USERS}.id = ${USERS_CHATS}.user_id
                                    where ${USERS}.id=? and ${CHATS}.id=?;`, [userId, chat.id]);
        if (!user.length){
            if (parseInt(adminId) === parseInt(chat.admin_id)) {
                await query(`INSERT INTO ${USERS_CHATS}(\`user_id\`, \`chat_id\`) VALUE (?, ?)`, [userId, chat.id]);
                return new Answer(SUCCESS);
            } else {
                return new Answer(NOT_CHAT_ADMIN);
            }
        }
        return new Answer(USER_E);
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
            await query(`DELETE FROM ${USERS_CHATS} WHERE user_id=? AND chat_id=?`, [userId, chatId]);
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
            SELECT ${USERS}.id  
                FROM ${CHATS}
                JOIN ${USERS_CHATS}
                    ON ${USERS_CHATS}.chat_id = ${CHATS}.id
                JOIN ${USERS}
                    ON ${USERS}.id = ${USERS_CHATS}.user_id
                WHERE ${CHATS}.id = ?;
            `, 
            [id]);
        if(!users.length) {
            await query(`DELETE FROM ${CHATS} WHERE id=?`, [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new ChatService();
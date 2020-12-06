const query = require('../libs/connection');
const { hash, compare } = require('../libs/crypt');
const { formatDate } = require('../libs/format');
const { SUCCESS, EMAIL_E, LOGIN_E, FAILURE, RECORD_NF } = require('../libs/statuses');
const Answer = require('../libs/Answer');
const { sendMail, create } = require('../services/VerificationService');
const { USERS } = require('../config/db_table_names');


class UserService {

    /**
     * 
     * @param {string} login
     * @returns {boolean} true - login is unique, false - login don't unique
     */
    async loginIsUnique(login) {
        const answer = await this.getByLogin(login); 
        return answer.getStatus() === RECORD_NF;
    }

    /**
     * 
     * @param {string} email
     * @returns {boolean} true - email is unique, email - login don't unique
     */
    async emailIsUnique(email) {
        const answer = await this.getByEmail(email); 
        return answer.getStatus() === RECORD_NF;
    }

    /**
     * Return user by id
     * 
     * @param {number} id
     * @returns {Answer} If user exist, then Answer contains status SUCCESS and data is user, otherwise status FAILURE and data is empty
     */
    async getById(id) {
        const [[user]] = await query(`SELECT * FROM ${USERS} WHERE id=?`, [id]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by login
     * 
     * @param {string} login
     * @returns {Answer} If user exist, then Answer contains status SUCCESS and data is user, otherwise status FAILURE and data is empty
     */
    async getByLogin(login) {
        const [[user]] = await query(`SELECT * FROM ${USERS} WHERE login=?`, [login]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }


    /**
     * Return user by email
     * 
     * @param {string} email
     * @returns {Answer} If user exist, then Answer contains status SUCCESS and data is user, otherwise status FAILURE and data is empty
     */
    async getByEmail(email) {
        const [[user]] = await query(`SELECT * FROM ${USERS} WHERE email=?`, [email]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by login and password
     * 
     * @param {string} login 
     * @param {string} password 
     * @returns {Answer} If user exist, then Answer contains status SUCCESS and data is user, otherwise status FAILURE and data is empty
     */
    async getByLoginAndPassord(login, password) {
        const [[user]] = await query(`SELECT * FROM ${USERS} WHERE login=? AND password=?;`, [login, password]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by email and password
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Answer} If user exist, then Answer contains status SUCCESS and data is user, otherwise status FAILURE and data is empty
     */
    async getByEmailAndPassword(email, password) {
        const [[user]] = await query(`SELECT * FROM ${USERS} WHERE email=? AND password=?;`, [email, password]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Create new user
     * 
     * @param {Object} user 
     * @param {string} user.email
     * @param {string} user.login
     * @param {string} user.name
     * @param {number} user.age
     * @param {Date} user.creationDate
     * @param {string} user.password
     * @returns {Answer} If user created, then Answer status SUCCESS, else if email exist status is EMAIL_E, else if login exist status is LOGIN_E  
     */
    async create(user) {
        const passHash = hash(user.password);
        const creationDate = user.creationDate ? formatDate(user.creationDate) : formatDate(new Date());
        const emailIsUnique = await this.emailIsUnique(user.email);
        const loginIsUnique = await this.loginIsUnique(user.login);
        const result = new Answer(SUCCESS);
        if (user && emailIsUnique && loginIsUnique) {
            await query(`INSERT INTO ${USERS}(\`email\`, \`login\`, \`name\`, \`age\`, \`creation_date\`, \`password\`, \`salt\`, \`role_id\`) 
                            VALUE (?, ?, ?, ?, ?, ?, ?, ?);`,
                        [user.email, user.login, user.name, user.age, creationDate, passHash.hash, passHash.salt, 11]);
                        
            const newUser = (await this.getByEmail(user.email)).getData();
            
            const { code } = (await create(newUser.id)).getData();
            sendMail(user.email, code); 

            result.setData({userId: newUser.id});
            return result;
        }

        if (!emailIsUnique) {
            result.setStatus(EMAIL_E);
        } else if (!loginIsUnique) {
            result.setStatus(LOGIN_E);
        }
        return result;
    }

    /**
     * Update password
     * 
     * @param {number} id 
     * @param {string} oldPassword 
     * @param {string} newPassword 
     * @returns {Answer} If password updated, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async updatePassword(id, oldPassword, newPassword) {
        const user = await this.getById(id);
        if (user.getStatus() && compare(oldPassword, user.data.password)) {
            newPassword = hash(newPassword);
            await query(`UPDATE ${USERS} SET password=?, salt=? WHERE id=?`, [newPassword.hash, newPassword.salt, id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Update name and age of user
     * 
     * @param {Object} user
     * @param {string} user.name
     * @param {number} user.age
     * @returns {Answer} If user updated, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async update(user) {
        const oldUser = await this.getById(user.id);
        if (oldUser.getStatus()) {
            await query(`UPDATE ${USERS} SET name=?, age=? WHERE id=?`, [user.name, user.age, user.id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Update verified field of user
     * 
     * @param {number} id 
     * @returns {Answer} If verified updated, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async updateVerification(id) {
        if (id) {
            await query(`UPDATE ${USERS} SET verified=? WHERE id=?`, [1, id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Update avatar image of user
     * 
     * @param {Object} user
     * @param {number} user.id
     * @param {string} user.avatarName
     * @returns {Answer} If avatar updated Answer status contains SUCCESS and data contains path to avatar image, otherwise status FAILURE
     */
    async updateAvatar(user) {
        if (user.avatarName) {
            await query(`UPDATE ${USERS} SET avatar_image=? WHERE id=?`, [user.avatarName, user.id]);
            return new Answer(SUCCESS, {path: user.avatarName});
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete user by id
     * 
     * @param {number} id
     * @returns {Answer} If user deleted, then Answer contains status SUCCESS, otherwise status FAILURE
     */
    async deleteById(id) {
        const user = await this.getById(id)
        if (user.getStatus()) {
            await query(`DELETE FROM ${USERS} WHERE id=?`, [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Search users by name
     * 
     * @param {string} string 
     * @param {number} limit
     * @param {number} offset
     * @returns {Answer} If users exist, then return Answer contains data with array of users, otherwise data equals empty array
     */
    async searchByName(string, limit = 10, offset = 0) {
        const regEx = `%${string.split('').join('%')}%`;
        if (limit > 30) limit = 30;
        const [users] = await query(`
            SELECT 
                ${USERS}.id, 
                ${USERS}.name, 
                ${USERS}.avatar_image 
            FROM ${USERS} WHERE name LIKE ?
            LIMIT ? OFFSET ?`, [regEx, parseInt(limit), parseInt(offset)]);
        return new Answer(SUCCESS, users);
    }
}

module.exports = new UserService();
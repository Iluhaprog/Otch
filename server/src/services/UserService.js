const query = require('../libs/connection');
const { hash } = require('../libs/crypt');
const formatDate = require('../libs/formatDate');
const { SUCCESS, EMAIL_E, LOGIN_E, FAILURE, RECORD_NF } = require('../libs/statuses');
const Answer = require('../libs/Answer');

class UserService {

    /**
     * 
     * @param {string} login
     * @returns {boolean} true - login is unique, false - login don't unique
     */
    async loginIsUnique(login) {
        const answer = await this.getByLogin(login); 
        return !(answer.getStatus());
    }

    /**
     * 
     * @param {string} email
     * @returns {boolean} true - email is unique, email - login don't unique
     */
    async emailIsUnique(email) {
        const answer = await this.getByEmail(email); 
        return !(answer.getStatus());
    }

    /**
     * Return user by id
     * 
     * @param {number} id
     * @returns {Answer} Answer contains information about error and data
     */
    async getById(id) {
        const [[user]] = await query('SELECT * FROM Users WHERE `id`=?', [id]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by login
     * 
     * @param {string} login
     * @returns {Answer} Answer contains information about error and data
     */
    async getByLogin(login) {
        const [[user]] = await query('SELECT * FROM Users WHERE `login`=?', [login]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }


    /**
     * Return user by email
     * 
     * @param {string} email
     * @returns {Answer} Answer contains information about error and data
     */
    async getByEmail(email) {
        const [[user]] = await query('SELECT * FROM Users WHERE `email`=?', [email]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by login and password
     * 
     * @param {string} login 
     * @param {string} password 
     * @returns {Answer} Answer contains information about error and data
     */
    async getByLoginAndPassord(login, password) {
        const [[user]] = await query('SELECT * FROM Users WHERE login=? AND password=?;', [login, password]);
        return user ? new Answer(SUCCESS, user) : new Answer(RECORD_NF);
    }

    /**
     * Return user by email and password
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Answer} Answer contains information about error and data
     */
    async getByEmailAndPassword(email, password) {
        const [[user]] = await query('SELECT * FROM Users WHERE email=? AND password=?;', [email, password]);
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
     * @param {Date} user.creation_date
     * @param {string} user.password
     * @returns {Answer} Answer contains information about error and data
     */
    async create(user) {
        const passHash = hash(user.password);
        const creation_date = user.creation_date ? formatDate(user.creation_date) : formatDate(new Date());
        const emailIsUnique = await this.emailIsUnique(user.email);
        const loginIsUnique = await this.loginIsUnique(user.login);
        const result = new Answer(SUCCESS);
        if (user && emailIsUnique && loginIsUnique) {
            await query(`INSERT INTO Users(\`email\`, \`login\`, \`name\`, \`age\`, \`creation_date\`, \`password\`, \`salt\`) 
                            VALUE (?, ?, ?, ?, ?, ?, ?);`,
                        [user.email, user.login, user.name, user.age, creation_date, passHash.hash, passHash.salt]);
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
     * @param {string} email 
     * @param {string} oldPassword 
     * @param {string} newPassword 
     * @returns {Answer} Answer contains information about error and data
     */
    async updatePassword(id, newPassword) {
        const user = await this.getById(id);
        if (user.getStatus()) {
            newPassword = hash(newPassword);
            await query('UPDATE Users SET `password`=?, `salt`=? WHERE `id`=?', [newPassword.hash, newPassword.salt, id]);
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
     * @returns {Answer} Answer contains information about error and data
     */
    async update(user) {
        const oldUser = await this.getById(user.id);
        if (oldUser.getStatus()) {
            await query('UPDATE Users SET name=?, age=? WHERE id=?', [user.name, user.age, user.id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }

    /**
     * Delete user by id
     * 
     * @param {number} id
     * @returns {Answer} Answer contains information about error and data
     */
    async deleteById(id) {
        const user = await this.getById(id)
        if (user.getStatus()) {
            await query('DELETE FROM Users WHERE `id`=?', [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }
}

module.exports = new UserService();
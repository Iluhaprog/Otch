const query = require('../libs/connection');
const { hash } = require('../libs/crypt');
const formatDate = require('../libs/formatDate');
const { SUCCESS, EMAIL_E, LOGIN_E } = require('../libs/userCreateStatuses');

class UserService {

    /**
     * 
     * @param {string} login
     * @returns {boolean} 
     */
    async loginIsUnique(login) {
        return !(await this.getByLogin(login));
    }

    /**
     * 
     * @param {string} email
     * @returns {boolean} 
     */
    async emailIsUnique(email) {
        return !(await this.getByEmail(email));
    }

    /**
     * Return user by id
     * 
     * @param {number} id
     * @returns {Object}
     */
    async getById(id) {
        const [user] = await query('SELECT * FROM Users WHERE `id`=?', [id]);
        return user || null;
    }

    /**
     * Return user by login
     * 
     * @param {string} login
     * @returns {Object}
     */
    async getByLogin(login) {
        const [[user]] = await query('SELECT * FROM Users WHERE `login`=?', [login]);
        return user || null;
    }


    /**
     * Return user by email
     * 
     * @param {string} email
     * @returns {Object}
     */
    async getByEmail(email) {
        const [[user]] = await query('SELECT * FROM Users WHERE `email`=?', [email]);
        return user || null;
    }

    /**
     * Return user by login and password
     * 
     * @param {string} login 
     * @param {string} password 
     * @returns {Object}  
     */
    async getByLoginAndPassord(login, password) {
        const [user] = await query('SELECT * FROM Users WHERE login=? AND password=?;', [login, password]);
        return user || null;
    }

    /**
     * Return user by email and password
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {Object}  
     */
    async getByEmailAndPassword(email, password) {
        const [user] = await query('SELECT * FROM Users WHERE email=? AND password=?;', [email, password]);
        return user || null;
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
     * @returns {boolean}
     */
    async create(user) {
        const passHash = hash(user.password);
        const creation_date = user.creation_date ? formatDate(user.creation_date) : formatDate(new Date());
        const emailIsUnique = await this.emailIsUnique(user.email);
        const loginIsUnique = await this.loginIsUnique(user.login);
        const result = {status: SUCCESS};
        if (user && emailIsUnique && loginIsUnique) {
            await query(`INSERT INTO Users(\`email\`, \`login\`, \`name\`, \`age\`, \`creation_date\`, \`password\`, \`salt\`) 
                            VALUE (?, ?, ?, ?, ?, ?, ?);`,
                        [user.email, user.login, user.name, user.age, creation_date, passHash.hash, passHash.salt]);
            return result;
        }

        console.log(emailIsUnique, '----', loginIsUnique);
        if (!emailIsUnique) {
            result.status = EMAIL_E;
        } else if (!loginIsUnique) {
            result.status = LOGIN_E;
        }
        return result;
    }

    /**
     * Update password
     * 
     * @param {string} email 
     * @param {string} oldPassword 
     * @param {string} newPassword 
     * @returns {boolean}
     */
    async updatePassword(id, newPassword) {
        const user = await this.getById(id);
        if (user) {
            newPassword = hash(newPassword);
            await query('UPDATE Users SET `password`=?, `salt`=? WHERE `id`=?', [newPassword.hash, newPassword.salt, id]);
            return true;
        }
        return false;
    }

    /**
     * Update name and age of user
     * 
     * @param {Object} user 
     * @param {string} user.email
     * @param {string} user.name
     * @param {number} user.age
     * @param {string} user.password
     * @returns {boolean}
     */
    async update(user) {
        const oldUser = await this.getById(user.id);
        if (oldUser) {
            await query('UPDATE Users SET `name`=?, `age`=? WHERE `id`=?', [user.name, user.age, oldUser.id]);
            return true;
        }
        return false;
    }

    /**
     * Delete user by id
     * 
     * @param {number} id
     * @returns {boolean} 
     */
    async deleteById(id) {
        const user = await this.getById(id)
        if (user) {
            await query('DELETE FROM Users WHERE `id`=?', [id]);
        }
        return false;
    }
}

module.exports = new UserService();
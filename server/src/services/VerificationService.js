const query = require('../libs/connection');
const Answer = require('../libs/Answer');
const { token } = require('../libs/crypt');
const { SUCCESS, FAILURE, RECORD_NF } = require('../libs/statuses');
const nodemailer = require('nodemailer');
const mailUser = require('../config/mailUser');
const { formatMailHTML } = require('../libs/format');

class VerificationService {

    /**
     * Compare two codes
     * 
     * @param {number} code1 
     * @param {number} code2
     * @returns {boolean} If code1 equals code2, then true, otherwise false 
     */
    async compareCodes(code1, code2) {
        return code1 === code2;
    }

    /**
     * Return verification code by id
     * 
     * @param {number} id
     * @returns {Answer} If verification code exist, then Answer contains status SUCCESS and data is verification code, otherwise status FAILURE and data is empty
     */
    async getById(id) {
        const [[verificationCode]] = await query('SELECT * FROM VerificationCodes WHERE `id`=?', [id]);
        return verificationCode 
                    ? new Answer(SUCCESS, verificationCode) 
                    : new Answer(RECORD_NF);
    }

    /**
     * Return verification code by user id
     * 
     * @param {number} userId
     * @returns {Answer} If verification code exist, then Answer contains status SUCCESS and data is verification code, otherwise status FAILURE and data is empty
     */
    async getByUserId(userId) {
        const [[verificationCode]] = await query('SELECT * FROM VerificationCodes WHERE `user_id`=?', [userId]);
        return verificationCode 
                    ? new Answer(SUCCESS, verificationCode) 
                    : new Answer(RECORD_NF);
    }

    /**
     * Create verification code
     * 
     * @param {number} userId 
     * @returns {Answer} If verification code created then Answer contains status SUCCESS and data is code, otherwise status FAILURE
     */
    async create(userId) {
        if (userId) {
            const code = token().slice(0, 6);
            await query('INSERT INTO VerificationCodes(`code`, `user_id`) VALUE (?, ?)', [code, userId]);
            return new Answer(SUCCESS, {code: code});
        }
        return new Answer(FAILURE);
    }

    /**
     * Update verification code
     * 
     * @param {number} id
     * @returns {Answer} If verification code updated, then Answer contains status SUCCESS, otherwise status FAILURE 
     */
    async update(id) {
        const result = await this.getById(id);
        if (result.getStatus() === SUCCESS) {
            const newCode = token().slice(0, 6);
            await query('UPDATE VerificationCodes SET `code`=? WHERE `id`=?', [newCode, id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);

    }

    /**
     * Delete verification code
     * 
     * @param {number} id 
     * @returns {Answer} If verification code deleted, then Answer contains status SUCCESS, otherwise status FAILURE 
     */
    async deleteById(id) {
        if (id) {
            await query('DELETE FORM VerificationCodes WHERE `id`=?', [id]);
            return new Answer(SUCCESS);
        }
        return new Answer(FAILURE);
    }


    /**
     * Send mail to user with address userAddress
     * 
     * @param {string} userAddress 
     * @param {string} code 
     */
    async sendMail(userAddress, code) {
        let account = mailUser;
        
        if (!mailUser.user) {
            account = await nodemailer.createTestAccount();
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com' ,
            port: 465,
            secure: true,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" ' + account.user,
            subject: 'Verification code for otch account',
            to: userAddress,
            html: formatMailHTML(code),
        });
    }
}

module.exports = new VerificationService();
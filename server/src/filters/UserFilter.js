const Answer = require('../libs/Answer');
const { FAILURE } = require('../libs/statuses');

/**
 * Сheck for an authorized request
 * 
 * @param {string} userIdField 
 * @returns {Function} middleware function
 */
const checkUser = (userIdField) => {
    return async (req, res, next) => {
        try {
            const user = req.user.data;
            const reqId = req.body[userIdField] || req.query[userIdField] || req.body.user[userIdField];
            if (parseInt(user.id) === parseInt(reqId)) {
                next();
            } else {
                res.json(new Answer(FAILURE, {message: 'Unauthorized'}));
            }
        } catch (err) {
            res.status(500).send('');
        }
    }
};

module.exports = {
    checkUser
};
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

/**
 * Create password hash
 * 
 * @param {string} str
 * @returns {Object} Object with fields hash - password hash, salt 
 */
const hash = str => {
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(str, salt);
    return { hash: hash, salt: salt};
};

/**
 * Generate random string
 * 
 * @returns {string} random string
 */
const token = () => {
    const key = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(16));
    return key;
}

/**
 * Compare hash and string
 * 
 * @param {string} str
 * @param {string} hash 
 * @returns {boolean} true if matching, otherwise false
 */
const compare = (str, hash) => {
    return bcrypt.compareSync(str, hash);
};

module.exports = {
    hash: hash,
    compare: compare,
    token: token
};
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const hash = str => {
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(str, salt);
    return { hash: hash, salt: salt};
};

const token = () => {
    const key = CryptoJS.enc.Hex.stringify(CryptoJS.lib.WordArray.random(16));
    return key;
}

const compare = (s, hash) => {
    return bcrypt.compareSync(s, hash);
};

module.exports = {
    hash: hash,
    compare: compare,
    token: token
};
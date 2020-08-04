const bcrypt = require('bcryptjs');

const hash = str => {
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(str, salt);
    return { hash: hash, salt: salt};
};

const compare = (s, hash) => {
    return bcrypt.compareSync(s, hash);
};

module.exports = {
    hash: hash,
    compare: compare
};
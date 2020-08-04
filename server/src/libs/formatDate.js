const format = date => {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

module.exports = format;
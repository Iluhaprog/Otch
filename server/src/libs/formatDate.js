/**
 * Format date
 * 
 * @param {Date} date 
 * @returns {string}
 */
const format = date => {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

module.exports = format;
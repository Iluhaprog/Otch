/**
 * Format date
 * 
 * @param {Date} date 
 * @returns {string}
 */
const formatDate = date => {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

/**
 * The function format the verification code with html for send by email
 * 
 * @param {string} code
 * @returns {string} html
 */
const formatMailHTML = (code) => {
    return `
        <html>
            <h1>Code: ${code}<b></b></h1>
        </html>
    `
}

module.exports = {
    formatDate,
    formatMailHTML
};
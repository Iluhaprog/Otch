const { FAILURE } = require("./statuses");

/**
 * Answer contains information about status and returned data
 */
class Answer {
    /**
     * @param {number} status 
     * @param {Object} data 
     */
    constructor(status = FAILURE, data = {}) {
        this.status = status;
        this.data = data;
    }

    /**
     * setter for field status
     * @param {number} status 
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * gatter for field status
     * @returns {number} status
     */
    getStatus() {
        return this.status;
    }

    /**
     * setter for field data
     * @param {*} data 
     */
    setData(data) {
        this.data = data || {};
    }

    /**
     * gatter for field data
     * @returns {*} data
     */
    getData() {
        return this.data;
    }

    toJSON() {
        return {
            status: this.status,
            data: this.data
        };
    }
}

module.exports = Answer;
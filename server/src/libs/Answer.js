const { FAILURE } = require("./statuses");

class Answer {
    /**
     * @param {number} status 
     * @param {Object} data 
     */
    constructor(status = FAILURE, data = {}) {
        this.status = status;
        this.data = data;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    setData(data) {
        this.data = data || {};
    }

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
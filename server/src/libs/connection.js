const mysql = require('mysql');
const config = require('../config/db');

const pool = mysql.createPool(config);

const query = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(query, params, (error, result, fields) => {
                connection.release();
                if (error) {
                    reject(error);
                } else {
                    resolve([result, fields]);
                }
            });
        });
    });
};

module.exports = query;
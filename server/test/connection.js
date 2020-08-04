const { describe, it } = require('mocha');
const { assert } = require('chai');
const query = require('../src/libs/connection');

describe('test query to database', () => {
    it('select * from Users', async () => {
        try {
            let [result] = await query('select * from Users;');
            assert.isArray(result, 'result is an object');
        } catch (error) {
            throw error;
        }
    });
});
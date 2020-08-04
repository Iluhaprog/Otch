const { describe, it } = require('mocha');
const { assert } = require('chai');
const format = require('../src/libs/formatDate');
const ChatService = require('../src/services/ChatService');

describe('Test ChatService', () => {
    let date = new Date();
    const id = 2;
    const key = '13f242f370d9092faa979d3b3f65d4c0';

    it('it should create new chat', async () => {
        await ChatService.create({name: 'Balabol chat', creation_date: date});
    });

    it('it should return chat by id = ' + id, async () => {
        const [chat] = await ChatService.getById(id);
        chat.creation_date = format(new Date(chat.creation_date));
        assert.deepEqual(chat, {
                id: id,
                name: 'Balabol chat',
                creation_date: chat.creation_date,
                key: chat.key
            }, 'returned chat is right')
    });

    it('it should add member with id=1 and key=' + key, async () => {
        const result = await ChatService.addMember(1, key);
        assert.notEqual(result, 0, 'result equal 0');
    });

    it('it should delete chat by id = ' + id, async () => {
        const result = await ChatService.deleteById(id);
        console.log(result);
    });

});
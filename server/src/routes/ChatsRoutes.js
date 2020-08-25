const { express } = require('../config/express');
const router = express.Router();
const ChatsController = require('../controllers/ChatsController');
const ChatsService = require('../services/ChatService');
const Answer = require('../libs/Answer');
const { FAILURE } = require('../libs/statuses');
const { addMember } = require('../services/ChatService');

const usersChats = new Map();

/**
 * Delete member from chat
 * 
 * @param {Object} data
 * @param {number} data.adminId
 * @param {number} data.userId
 * @param {string} data.chatKey
 * @returns {Object} If data contains values of adminId, userId, chatKey and result status is SUCCESS, 
 *                   then returns data about deleted member and result for him. Otherwise returns null.
 */
const deleteMember = async data => {
    const {adminId, userId, chatKey} = data;
    if (adminId && userId && chatKey) {
        const result = await ChatsService.deleteMember(adminId, userId, chatKey);
        result.setData({message: 'You deleted from this chat'});
        return result.getStatus() ? {key: userId + chatKey, data: result} : null;
    }
    return null;
};

/**
 * Send message to connection with key
 * 
 * @param {string} key 
 * @param {string} message 
 */
const send = (key, message) => {
    const member = usersChats.get(key);
    member.send(message);
}

router.ws('/deleteMember', (ws, req) => {
    const key = req.query.ui + req.query.ck;
    usersChats.set(key, ws);

    ws.on('message', async message => {
        const result = await deleteMember(JSON.parse(message));
        let msg = JSON.stringify(new Answer(FAILURE, {message: 'You have not authority'}));
        if (result) {
            msg = JSON.stringify(result.data);
            send(result.key, msg);
        } else {
            send(key, msg);
        }
    });
    
    ws.on('error', err => {
        console.log(err);
    });
});

router
    .get('/getById', ChatsController.getById)
    .get('/getByKey', ChatsController.getByKey)
    .get('/getByUserId', ChatsController.getByUserId)
    .post('/create', ChatsController.create)
    .put('/addMember', ChatsController.addMember)
    .delete('/deleteById', ChatsController.deleteById);

module.exports = router;
const { express, upload } = require('../config/express');
const router = express.Router();
const ChatsController = require('../controllers/ChatsController');
const ChatsService = require('../services/ChatService');
const NotificationsService = require('../services/NotificationsService');
const Answer = require('../libs/Answer');
const { FAILURE, SUCCESS } = require('../libs/statuses');
const { checkUser } = require('../filters/UserFilter');
const { authenticateMd } = require('../filters/Authenticate');

const usersChats = new Map();
const connections = new Array();

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
        return result.getStatus() ? {key: userId + '.' + chatKey, data: result} : null;
    }
    return null;
};

/**
 * Send message to connection with key
 * 
 * @param {string} key 
 * @param {string} message 
 */
const send = async (key, message) => {
    const member = usersChats.get(key);
    if (member) {
        member.send(message);
    } else {
        const userId = key.split('.')[0];
        const data = JSON.parse(message).data;
        const notification = {
            "message": data.message,
            "viewed": 0,
            "creationDate": new Date(),
            "userId": parseInt(userId)
        };
        await NotificationsService.create(notification);
    }
}

router.ws('/deleteMember', (ws, req) => {
    // ui - whose user can be deleted, ck - chat key
    const key = req.query.ui + '.' + req.query.ck;
    usersChats.set(key, ws);

    ws.on('message', async message => {
        const result = await deleteMember(JSON.parse(message));
        let msg = JSON.stringify(new Answer(FAILURE, {message: 'You have not authority'}));
        if (result) {
            msg = JSON.stringify(result.data);
            await send(result.key, msg);
        } else {
            await send(key, msg);
        }
    });
    
    ws.on('error', err => {
        console.log(err);
    });
});

router.ws('/updateChatList', (ws, req) => {
    connections.push(ws);
    ws.on('message', message => {
        const msgObject = JSON.parse(message);
        if (msgObject['userId']) {
            connections.forEach( connection => {
                connection.send(
                    JSON.stringify(
                        new Answer(SUCCESS, {
                            userId: msgObject['userId']
                        })
                    )
                );
            });
        } else {
            ws.send(JSON.stringify(new Answer(FAILURE, {message: 'User id is undefined'})))
        }
    });

    ws.on('error', err => {
        console.log(err);
    });
});

router
    .get('/getById', ChatsController.getById)
    .get('/getByKey', ChatsController.getByKey)
    .get('/getByUserId', authenticateMd(), checkUser('userId'), ChatsController.getByUserId)
    .post('/create', upload.single('avatar'), ChatsController.create)
    .put('/addMember', ChatsController.addMember)
    .delete('/deleteById', ChatsController.deleteById);

module.exports = router;
const { express } = require('../config/express');
const router = express.Router();
const MessagesController = require('../controllers/MessagesController');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');

const roomsConnects = new Map();

/**
 * Add connection to the room
 * 
 * @param {WebSocket} socket 
 * @param {strign} key 
 */
const addConnect = (socket, key) => {
    if (roomsConnects.has(key)) {
        const roomConnects = roomsConnects.get(key);
        roomConnects.push(socket);
        roomsConnects.set(key, roomConnects);
    } else {
        roomsConnects.set(key, [socket]);
    }
}

/**
 * Send message for room connections
 * 
 * @param {string} message 
 * @param {string} key 
 */
const send = (message, key) => {
    roomsConnects.get(key).forEach(socket => {
        socket.send(JSON.stringify(message));
    });
}

/**
 * Run action
 * 
 * @param {string} action 
 * @param {*} data 
 */
const runAction = async (action, data) => {
    let result = new Answer(FAILURE);
    switch(action) {
        case 'c':
            result = await MessagesController.create(data);
            break;
        case 'u':
            result = await MessagesController.update(data);
            break;
        case 'd':
            result = await MessagesController.deleteById(data);
            break;
        case 'i':
            result = await MessagesController.createFile(data);
            break;
    }
    return result;
};

router.ws('/send', (ws, req) => {
    const key = req.query.key;
    addConnect(ws, key);

    ws.on('message', async message => {
        const action = req.query.a;
        let result = new Answer(FAILURE);
        if (message instanceof Buffer) {
            const data = {
                chatId: req.query.ci,
                userId: req.query.ui,
                message: message
            };            
            result = await runAction(action, data);
            send(result, key);
        } else if (typeof message === 'string') {
            result = await runAction(action, message);
            message.action = action;
            result.setData(message);
            send(result, key);
        } else {
            result.setData({message: 'type of loaded is data not supported'});
            ws.send(JSON.stringify(result));
        }
    });

    ws.on('close', () => {
        const connects = roomsConnects.get(key).filter(connect => {
            return !(connect === ws);
        });
        roomsConnects.set(key, connects);
    })
});

router
    .get('/byId', MessagesController.getById)
    .get('/byChat', MessagesController.getByChatId)
    .get('/byUserAndChat', MessagesController.getByUserIdAndChatId)

module.exports = router;
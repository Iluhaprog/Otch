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

router.ws('/send', (ws, req) => {
    const key = req.query.key;
    addConnect(ws, key);

    ws.on('message', async message => {
        const action = req.query.a;
        let result = new Answer(FAILURE);
        message = JSON.parse(message);
        switch(action) {
            case 'c':
                result = await MessagesController.create(message);
                break;
            case 'u':
                result = await MessagesController.update(message);
                break;
            case 'd':
                result = await MessagesController.deleteById(message);
                break;
        }
        message.action = action
        result.setData(message);
        send(result, key);
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
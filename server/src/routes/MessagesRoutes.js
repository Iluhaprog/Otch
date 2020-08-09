const { express, wsInstance } = require('../config/express');
const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

const roomsConnects = new Map();

const addConnect = (socket, key) => {
    if (roomsConnects.has(key)) {
        const roomConnects = roomsConnects.get(key);
        roomConnects.push(socket);
        roomsConnects.set(key, roomConnects);
    } else {
        roomsConnects.set(key, [socket]);
    }
}

const send = (message, key) => {
    roomsConnects.get(key).forEach(socket => {
        socket.send(JSON.stringify(message));
    });
}

router.ws('/send', (ws, req) => {
    const key = req.query.key;
    addConnect(ws, key);

    ws.on('message', async message => {
        const act = req.query.a;
        let result = false;
        message = JSON.parse(message);
        switch(act) {
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
        if (!result) {
            message.error = true;
        }
        message.act = act
        send(message, key);
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
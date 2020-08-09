const { express, wsInstance } = require('../config/express');
const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

const roomsConnects = new Map();

router.ws('/send', (ws, req) => {
    const key = req.query.key;

    if (roomsConnects.has(key)) {
        let connects = roomsConnects.get(key);
        connects.push(ws);
    } else {
        roomsConnects.set(key, [ws]);
    }

    ws.on('message', async msg => {
        const result = await MessagesController.create(JSON.parse(msg));
        if (result) {
            roomsConnects.get(key).forEach(socket => {
                socket.send(msg);
            });
        } else {
            msg = JSON.parse(msg);
            msg.error = true;
            ws.send(JSON.stringify(msg));
        }
    });
});

router.ws('/update', (ws, req) => {
    ws.on('message', async (msg) => {
        const result = await MessagesController.update(JSON.parse(msg));
        const res = result ? msg : 'Don\'t send';
        ws.send(res);
    });
});

router.ws('/delete', (ws, req) => {
    ws.on('message', async (msg) => {
        const result = await MessagesController.deleteById(JSON.parse(msg));
        const res = result ? msg : 'Don\'t send';
        ws.send(res);
    });
});



router
    .get('/byId', MessagesController.getById)
    .get('/byChat', MessagesController.getByChatId)
    .get('/byUserAndChat', MessagesController.getByUserIdAndChatId)

module.exports = router;
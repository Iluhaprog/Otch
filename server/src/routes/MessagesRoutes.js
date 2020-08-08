const express = require('../config/express').express;
const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router.ws('/send', (ws, req) => {
    ws.on('message', async (msg) => {
        const result = await MessagesController.create(JSON.parse(msg));
        const res = result ? msg : 'Don\'t send';
        ws.send(res);
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
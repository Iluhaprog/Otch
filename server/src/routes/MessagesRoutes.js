const express = require('../config/express').express;
const router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router.ws('/message', (ws, req) => {
    ws.on('send', async (msg) => {
        let result = await MessagesController.create(msg);
        if (result) {
            ws.send(msg);
        }
        ws.send({msg: 'Don\'t send'})
    });
    ws.on('update', async (msg) => {
        let result = await MessagesController.update(msg);
        if (result) {
            ws.send(msg);
        }
        ws.send({msg: 'Don\'t update'})
    });
    ws.on('delete', async (msg) => {
        let result = await MessagesController.deleteById(msg);
        if (result) {
            ws.send({msg: 'ok'});
        }
        ws.send({msg: 'Don\'t delete'})
    })
});

router
    .get('/byId', MessagesController.getById)
    .get('/byChat', MessagesController.getByChatId)
    .get('/byUserAndChat', MessagesController.getByUserIdAndChatId)

module.exports = router;
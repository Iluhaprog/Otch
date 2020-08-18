const { express } = require('../config/express');
const router = express.Router();
const ChatsController = require('../controllers/ChatsController');

router
    .get('/getById', ChatsController.getById)
    .get('/getByKey', ChatsController.getByKey)
    .get('/getByUserId', ChatsController.getByUserId)
    .post('/create', ChatsController.create)
    .put('/addMember', ChatsController.addMember)
    .delete('/deleteById', ChatsController.deleteById);

module.exports = router;
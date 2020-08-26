const { express } = require('../config/express');
const router = express.Router();
const NotificationsController = require('../controllers/NotificationsController');

router
    .get('/getById', NotificationsController.getById)
    .get('/getByUserId', NotificationsController.getByUserId)
    .post('/create', NotificationsController.create)
    .put('/update', NotificationsController.update)
    .delete('/deleteById', NotificationsController.deleteById);

module.exports = router;
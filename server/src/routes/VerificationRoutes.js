const { express } = require('../config/express');
const router = express.Router();
const VerificationController = require('../controllers/VerificationController');

router
    .get('/getById', VerificationController.getById)
    .get('/getByUserId', VerificationController.getByUserId)
    .post('/create', VerificationController.create)
    .put('/update', VerificationController.update)
    .delete('/deleteById', VerificationController.update);

module.exports = router;
const VerificationService = require('../services/VerificationService');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');
const { updateVerification } = require('../services/UserService');

class VerificationController {

    async getById(req, res) {
        const id = req.body.id;
        const result = await VerificationService.getById(id);
        res.json(result);
    }
    
    async getByUserId(req, res) {
        const userId = req.body.userId;
        const result = await VerificationService.getByUserId(userId);
        res.json(result);
    }

    async create(req, res) {
        const userId = req.body.userId;
        const result = await VerificationService.create(userId);
        res.json(result);
    }
    
    async update(req, res) {
        const id = req.body.id;
        const result = await VerificationService.update(id);
        res.json(result);
    }
    
    async deleteById(req, res) {
        const id = req.body.id;
        const result = await VerificationService.deleteById(id);
        res.json(result);
    }

    async compareCodes(req, res) {
        const { userId, code } = req.body;
        const comparisionCode = (await VerificationService.getByUserId(userId)).getData();
        const result = await VerificationService.compareCodes(code, comparisionCode.code);
        if (result) {
            await updateVerification(userId);
            res.json(new Answer(SUCCESS));
        } else {
            res.json(new Answer(FAILURE));
        }
    }
}

module.exports = new VerificationController();
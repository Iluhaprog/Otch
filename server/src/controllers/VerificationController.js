const VerificationService = require('../services/VerificationService');
const Answer = require('../libs/Answer');
const { SUCCESS, FAILURE } = require('../libs/statuses');
const { updateVerification } = require('../services/UserService');

class VerificationController {

    async getById(req, res) {
        try {
            const id = req.body.id;
            const result = await VerificationService.getById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }
    
    async getByUserId(req, res) {
        try {
            const userId = req.body.userId;
            const result = await VerificationService.getByUserId(userId);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async create(req, res) {
        try {
            const userId = req.body.userId;
            const result = await VerificationService.create(userId);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }
    
    async update(req, res) {
        try {
            const id = req.body.id;
            const result = await VerificationService.update(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }
    
    async deleteById(req, res) {
        try {
            const id = req.body.id;
            const result = await VerificationService.deleteById(id);
            res.json(result);
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }

    async compareCodes(req, res) {
        try {
            const { userId, code } = req.body;
            const comparisionCode = (await VerificationService.getByUserId(userId)).getData();
            const result = await VerificationService.compareCodes(code, comparisionCode.code);
            if (result) {
                await updateVerification(userId);
                res.json(new Answer(SUCCESS));
            } else {
                res.json(new Answer(FAILURE));
            }
        } catch (err) {
            console.log(err);
            res.setStatus(500);
            res.end();
        }
    }
}

module.exports = new VerificationController();
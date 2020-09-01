const VerificationService = require('../services/VerificationService');

class VerificationController {

    async getById(req, res) {
        const id = req.body.id;
        const result = await VerificationService.getById(id);
        res.json(result);
    }
    
    async getByUserId(req, res) {
        const userId = req.body.userId;
        const result = await VerificationService.getById(userId);
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
}

module.exports = new VerificationController();
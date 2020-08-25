class ErrorsController {
    async error404(req, res) {
        res.status(404).send('Error 404');
    }

    async error500(err, req, res, next) {
        res.status(500).send('500: Internal Server Error');
    }
}

module.exports = new ErrorsController();
class ErrorsController {
    async error404(req, res) {
        res.send('Error 404', 404);
    }

    async error500(err, req, res, next) {
        res.send('500: Internal Server Error', 500);
    }
}

module.exports = new ErrorsController();
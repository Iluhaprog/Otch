module.exports = {
    env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info'
}
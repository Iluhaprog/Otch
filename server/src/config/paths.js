const path = require('path');

const paths = {
    ssl: {
        key: '/home/ilya/Documents/projects/otch/selfsigned.key',
        cert: '/home/ilya/Documents/projects/otch/selfsigned.crt',
        ca: '/home/ilya/Documents/projects/otch/ca.key'
    },
    files: {
        avatars: path.join(__dirname, '/../public/avatars/'),
        chats: path.join(__dirname, '/../public/chats/')
    }
}

module.exports = paths;
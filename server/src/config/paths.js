const path = require('path');

const paths = {
    files: {
        chatsResp: 'chats/',
        avatars: path.join(__dirname, '/../public/avatars/'),
        chats: path.join(__dirname, '/../public/chats/'),
    }
}

module.exports = paths;
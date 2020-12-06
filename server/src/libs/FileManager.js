const fs = require('fs');
const path = require('path');
const dropboxV2Api = require('dropbox-v2-api');

const dropbox = dropboxV2Api.authenticate({
    token: process.env.DROP_BOX_TOKEN,
    
});

class FileManager { 
    constructor() {
        this.AVATAR = 0;
        this.CHAT_FILE = 1;
        this.folder = process.env.DROP_BOX_FOLDER;
    }

    isAvatar(type) {
        return type === this.AVATAR;
    }

    isChatFile(type) {
        return type === this.CHAT_FILE;
    }

    /**
     * Upload file to dropbox
     * 
     * @param {string} filepath 
     * @param {string} filename 
     */
    upload(filepath, filename) {
        const file = path.join(filepath, filename);
        dropbox({
            resource: 'files/upload',
            parameters: {
                path: path.join(this.folder, filename)
            },
            readStream: fs.createReadStream(file)
        }, (err, result, response) => {
            if (err) console.error(err);
        });
    }

    /**
     * Download file from dropbox
     * 
     * @param {string} filename 
     */
    download(filepath, filename, callback) {
        const file = path.join(filepath, filename);
        const stream = dropbox({
            resource: 'files/download',
            parameters: {
                path: path.join(this.folder, filename)
            }
        }, (err, result, response) => {
            if (err) console.error(err);
            callback && callback(); 
        });
        stream.pipe(fs.createWriteStream(file));
        return stream;
    }
}

module.exports = new FileManager();
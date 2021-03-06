import { GET, POST_X, PUT, WS } from './../util/api';

const getByUserId = userId => {
    return GET({
        url: '/chats/getByUserId',
        params: {
            userId: userId,
        },
        credentials: 'include',
        mode: 'cors',
    }).then(response => response.json())
}

const create = ({formData, success}) => {
    POST_X({
        url: '/chats/create',
        body: formData,
        credentials: true,
        success: success,
        error: function(e) {
            console.log(this.statusText);
        },
    })
}

const addMember = ({adminId, memberId, key}) => {
    return PUT({
        url: '/chats/addMember',
        headers: { 
            'Content-type': 'application/json'
        },
        body: {
            adminId: adminId,
            memberId: memberId,
            key: key,
        },
        credentials: 'include',
    }).then(response => response.json());
}

const updateChatList = ({onopen, onmessage, userId}) => {
    return WS({
        url: '/chats/updateChatList',
        params: {
            ui: userId
        },
        onopen: onopen,
        onmessage: onmessage,
    });
};

export {
    getByUserId,
    create,
    addMember,
    updateChatList
};
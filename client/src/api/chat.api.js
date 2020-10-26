import { GET, POST, PUT, DELETE } from './../util/api';

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

export {
    getByUserId
};
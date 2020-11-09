import { GET, WS } from '../util/api';

const sendMessage = ({onopen, onmessage, onerror, params}) => {
    return WS({
        url: '/messages/send',
        params: params,
        onopen: onopen,
        onmessage: onmessage,
        onerror: onerror,
    });
}

const getMessagesByChatId = id => {
    return GET({
        url: '/messages/byChat',
        params: {
            chatId: id,
        },
        credentials: 'include',
        mode: 'cors',
    }).then(response => response.json());
}

export { getMessagesByChatId, sendMessage };

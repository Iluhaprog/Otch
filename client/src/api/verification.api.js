import { GET } from './../util/api';

const compare = ({userId, code}) => {
    return GET({
        url: '/verification/compare',
        params: {
            userId: userId,
            code: code,
        },
        credentials: 'include',
        mode: 'cors',
    }).then(response => response.json());
};

export {
    compare,
};
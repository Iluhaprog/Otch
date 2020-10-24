import { GET, POST, PUT, DELETE, POST_X } from './../util/api';
import base64 from 'base-64';

const getById = id => {
    return GET({
        url: '/users/getById',
        params: {
            id: id
        },
        credentials: 'include',
    }).then(response => response.json());
}

const login = ({login, password}) => {
    return POST({
        url: '/users/login',
        headers: {
            'Authorization': `Basic ${base64.encode(`${login}:${password}`)}`,
        },
        body: {
            'grant_type': 'password'
        },
        credentials: 'include',
    }).then(response => response.json());
};

const logout = () => {
    return GET({
        url: '/users/logout',
    }).then(response => response.json());
}

const registration = (data) => {
    return POST({
        url: '/users/registration',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {user: data},
    }).then(response => response.json());
};

const updateAvatar = ({id, formData, success}) => {
    POST_X({
        url: '/users/updateAvatar',
        params: {
            id: id,
        },
        body: formData,
        credentials: true,
        success: success,
        error: function(e) {
            console.log(this.statusText);
        } 
    });
}

export {
    login,
    logout,
    registration,
    getById,
    updateAvatar
};
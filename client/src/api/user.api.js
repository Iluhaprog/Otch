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

const update = ({id, name, age}) => {
    return PUT({
        url: '/users/update',
        headers: { 
            'Content-type': 'application/json'
        },
        body: {
            user: {
                id: id,
                name: name,
                age: age,
            }
        },
        credentials: 'include',
    }).then(response => response.json());
}

const updatePassword = ({id, oldPassword, newPassword}) => {
    return PUT({
        url: '/users/updatePassword',
        headers: { 
            'Content-type': 'application/json'
        },
        body: {
            id: id,
            oldPassword: oldPassword,
            newPassword: newPassword,
        },
        credentials: 'include',
    }).then(response => response.json());
}


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

const search = name => {
    return GET({
        url: '/users/search',
        params: {
            q: name,
            l: 20,
            o: 0,
        }
    }).then(response => response.json());
}

export {
    login,
    logout,
    registration,
    getById,
    updateAvatar,
    update,
    updatePassword,
    search
};
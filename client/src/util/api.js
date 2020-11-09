import { apiUrl, apiWsHost } from './../config';

const toParams = obj => obj ? Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&') : '';

const request = method => {
    return ({host, url, body, params, headers, credentials, mode}) => {
        return  fetch(`${host || apiUrl}${url}${params ? '?' + toParams(params) : ''}`,{
                    method: method,
                    headers: headers,
                    credentials: credentials,
                    mode: mode,
                    body: JSON.stringify(body),
                });
    }
}

const xhrRequest = method => {
    return ({host, url, body, params, credentials, success, error}) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${host || apiUrl}${url}${params ? '?' + toParams(params) : ''}`, true);
        xhr.withCredentials = credentials;
        xhr.addEventListener('load', success);
        xhr.addEventListener('error', error);
        xhr.send(body);
    }
}

const webSocket = () => {
    const mainHost = apiWsHost;
    return ({host, url, params, protocols,  onopen, onmessage, onclose, onerror}) => {
        const wss = new WebSocket(`${mainHost || host}${url}${params ? '?' + toParams(params) : ''}`, protocols);
        wss.onopen = onopen;
        wss.onmessage = onmessage;
        wss.onclose = onclose;
        wss.onerror = onerror;
        return wss;
    }
}

const GET = request('GET');
const GET_X = xhrRequest('GET');

const POST = request('POST');
const POST_X = xhrRequest('POST');

const PUT = request('PUT');
const DELETE = request('DELETE');

const WS = webSocket();

export { GET, GET_X, POST, POST_X, PUT, DELETE, WS };
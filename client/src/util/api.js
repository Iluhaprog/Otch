import { apiUrl } from './../config';

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

const GET = request('GET');
const POST = request('POST');
const PUT = request('PUT');
const DELETE = request('DELETE');

export { GET, POST, PUT, DELETE };
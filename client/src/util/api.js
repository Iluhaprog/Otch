import { apiUrl } from './../config';

const toParams = obj => obj ? Object.keys(obj).map(([key, value]) => `${key}=${value}`).join('&') : '';

const request = method => {
    return ({url, body, params, headers}) => {
        return  fetch(`${apiUrl}${url}${params ? '?' + toParams(params) : ''}`,{
                    method: method,
                    headers: headers,
                    body: JSON.stringify(body),
                });
    }
}

const GET = request('GET');
const POST = request('POST');
const PUT = request('PUT');
const DELETE = request('DELETE');

export { GET, POST, PUT, DELETE };
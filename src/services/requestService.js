import Axios from 'axios';

const method = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete'
};

const sendRequest = (method, url, params, data) => {
    const Authorization = localStorage.getItem('Authorization');
    const headers = {Authorization};
    return Axios.request({
        method,
        url,
        headers,
        params,
        data,
    });
};


export const RestRequest = {
    get: (endpoint, params, data) => sendRequest(method.GET, endpoint, params, data),
    put: (endpoint, params, data) => sendRequest(method.PUT, endpoint, params, data),
    post: (endpoint, params, data) => sendRequest(method.POST, endpoint, params, data),
    delete: (endpoint, params, data) => sendRequest(method.DELETE, endpoint, params, data)
};
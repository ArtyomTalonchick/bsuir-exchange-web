import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';

const login = (username, password) => RestRequest.post(endpoints.user.login, {},{username, password});

const registration = (username, password) => RestRequest.post(endpoints.user.registration, {},{username, password});

export default {
    login,
    registration
}
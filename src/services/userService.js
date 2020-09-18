import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {finishLoading, startLoading} from '../components/withLoader';
import {setError} from '../components/withAlert';
import {setUser} from '../components/withUser';

const _login = (username, password) => RestRequest.post(endpoints.user.login, {},{username, password});

const _registration = (username, password) => RestRequest.post(endpoints.user.registration, {},{username, password});

const auth = (method, username, password) => {
    startLoading();
    return method(username, password)
        .then(response => {
            setUser(JSON.parse(response.data));
            return true;
        })
        .catch(reason => {
            const status = reason.response.status;
            const error = status === 403 ? 'Email or password is wrong' : 'Server error, sorry, try again later';
            setError(error);
            return false;
        })
        .finally(finishLoading);
}

const registration = (username, password) => auth(_registration, username, password);

const login = (username, password) => auth(_login, username, password);

const logout = () => setUser(null);

export default {
    login,
    registration,
    logout
}
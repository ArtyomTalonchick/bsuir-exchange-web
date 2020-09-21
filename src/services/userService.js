import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';
import {setUser} from '../providers/userProvider';
import {setAccounts} from '../providers/accountsProvider';
import {setAssets} from '../providers/assetsProvider';

const _login = (username, password) => RestRequest.post(endpoints.user.login, {},{username, password});

const _registration = (username, password) => RestRequest.post(endpoints.user.registration, {},{username, password});

const auth = (method, username, password) => {
    startLoading(MODULES.USER);
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
        .finally(() => finishLoading(MODULES.USER));
}

const registration = (username, password) => auth(_registration, username, password);

const login = (username, password) => auth(_login, username, password);

const logout = () => {
    setUser(null);
    setAccounts([]);
    setAssets([]);
}

export default {
    login,
    registration,
    logout
}
import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError, setSuccess} from '../providers/alertsProvider';
import {setUser} from '../providers/userProvider';
import {setAccounts} from '../providers/accountsProvider';
import {setAssets} from '../providers/assetsProvider';

const _login = (username, password) => RestRequest.post(endpoints.user.login, {}, {username, password});

const _registration = (username, password) => RestRequest.post(endpoints.user.registration, {}, {username, password});

const auth = (method, username, password) => {
    startLoading(MODULES.USER);
    return method(username, password)
        .then(response => {
            const data = JSON.parse(response.data);
            if (response.status === 200) {
                setUser(data);
            } else {
                setSuccess(data.message);
            }
            return true;
        })
        .catch(reason => {
            const message = reason.response.status === 409
                ? 'User with such mail already exists'
                : 'Server error, sorry, try again later';
            reason.response.status !== 401 && setError(message);
            return false;
        })
        .finally(() => finishLoading(MODULES.USER));
}

const registration = (username, password) => auth(_registration, username, password);

const login = (username, password) => auth(_login, username, password);

const update = () => {
    if (!localStorage.getItem('Authorization')) return;

    startLoading(MODULES.USER);
    return RestRequest.get(endpoints.user.info, {}, {})
        .then(response => {
            setUser(JSON.parse(response.data));
            return true;
        })
        .catch(() => {
        })
        .finally(() => finishLoading(MODULES.USER));
}

const logout = () => {
    setUser(null);
    setAccounts([]);
    setAssets([]);
}

export default {
    login,
    registration,
    logout,
    update
}
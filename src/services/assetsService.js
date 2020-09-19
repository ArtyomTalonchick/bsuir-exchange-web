import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';
import {getCurrentAccount} from '../providers/accountsProvider';
import {setAssets} from '../providers/assetsProvider';

const _get = (account_id) => RestRequest.get(endpoints.assets.get(account_id), {}, {});

const _create = (account_id, currency_id, volume) =>
    RestRequest.post(endpoints.assets.create, {}, {account_id, currency_id, volume});

const execute = method => {
    startLoading();
    return method()
        .then(response => {
            setAssets(JSON.parse(response.data));
            return true;
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
            return false;
        })
        .finally(finishLoading);
}

const update = () => {
    const accountId = getCurrentAccount()?.id;
    if (accountId) {
        return execute(() => _get(accountId));
    } else {
        return new Promise(((resolve, reject) => reject()));
    }
}

const create = (volume, currency_id) => {
    const accountId = getCurrentAccount()?.id;
    if (accountId) {
        return execute(() => _create(accountId, currency_id, volume));
    } else {
        setError('Select an account and try again');
        return new Promise(((resolve, reject) => reject()));
    }
}


export default {
    update,
    create,
}
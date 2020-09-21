import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';
import {getCurrentAccount} from '../providers/accountsProvider';
import {setAssets} from '../providers/assetsProvider';

const INTERVAL = 1000;

const _get = (account_id) => RestRequest.get(endpoints.assets.get(account_id), {}, {});

const _create = (account_id, currency_id, volume) =>
    RestRequest.post(endpoints.assets.create, {}, {account_id, currency_id, volume});

const updateAssets = () => {
    const accountId = getCurrentAccount()?.id;
    if (!accountId) {
        setTimeout(updateAssets, INTERVAL);
        return;
    }

    _get(accountId)
        .then(response => {
            setAssets(JSON.parse(response.data));
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
        })
        .finally(() => {
            finishLoading(MODULES.ASSETS);
            setTimeout(updateAssets, INTERVAL);
        });
}
setTimeout(updateAssets, INTERVAL);

const create = (volume, currency_id) => {
    const accountId = getCurrentAccount()?.id;
    if (accountId) {
        startLoading(MODULES.ASSETS);
        return _create(accountId, currency_id, volume)
            .then(response => {
                setAssets(JSON.parse(response.data));
                return true;
            })
            .catch(() => {
                setError('Server error, sorry, try again later');
                return false;
            })
            .finally(() => finishLoading(MODULES.ASSETS));
    } else {
        setError('Select an account and try again');
        return new Promise(((resolve, reject) => reject()));
    }
}


export default {
    create,
}
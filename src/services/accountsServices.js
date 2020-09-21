import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';
import {setAccounts} from '../providers/accountsProvider';

const create = name => {
    startLoading(MODULES.ACCOUNTS);
    return RestRequest.post(endpoints.accounts.create, {}, {name})
        .then(response => {
            const accounts = JSON.parse(response.data);
            setAccounts(accounts);
            return accounts;
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
            return null;
        })
        .finally(() => finishLoading(MODULES.ACCOUNTS));
}

export default {
    create
}
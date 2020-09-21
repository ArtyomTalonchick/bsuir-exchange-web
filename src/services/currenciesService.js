import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';

const getAll = () => {
    startLoading(MODULES.CURRENCIES);
    return RestRequest.get(endpoints.currencies, {}, {})
        .then(response => JSON.parse(response.data))
        .catch(() => {
            setError('Server error, sorry, try again later');
            return null;
        })
        .finally(() => finishLoading(MODULES.CURRENCIES));
}

export default {
    getAll
}
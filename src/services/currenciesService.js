import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';

const getAll = () => {
    startLoading();
    return RestRequest.get(endpoints.currencies, {}, {})
        .then(response => JSON.parse(response.data))
        .catch(() => {
            setError('Server error, sorry, try again later');
            return null;
        })
        .finally(finishLoading);
}

export default {
    getAll
}
import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setError} from '../providers/alertsProvider';
import {setSymbols} from '../providers/symbolsProvider';

const getAll = () => {
    startLoading(MODULES.SYMBOLS);
    return RestRequest.get(endpoints.symbols, {}, {})
        .then(response => {
            const symbols = JSON.parse(response.data);
            setSymbols(symbols);
            return symbols;
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
            return null;
        })
        .finally(() => finishLoading(MODULES.SYMBOLS));
}

export default {
    getAll
}
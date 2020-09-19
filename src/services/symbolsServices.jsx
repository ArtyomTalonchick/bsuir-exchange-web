import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {finishLoading, startLoading} from '../components/withLoader';
import {setError} from '../components/withAlert';
import {setSymbols} from '../components/withSymbols';

const getAll = () => {
    startLoading();
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
        .finally(finishLoading);
}

export default {
    getAll
}
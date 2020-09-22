import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {finishLoading, startLoading} from '../providers/loaderProvider';
import {getCurrentAccount} from '../providers/accountsProvider';
import {setHistory} from '../providers/historyProvider';

const INTERVAL = 1000;

const updateHistory = () => {
    const symbol = getCurrentSymbol();
    const accountId = getCurrentAccount()?.id;
    if (!symbol || !accountId) {
        setTimeout(updateHistory, INTERVAL);
        return;
    }

    RestRequest.get(endpoints.orders.history, {symbol_id: symbol.id, account_id: accountId}, {})
        .then(response => {
            setHistory(JSON.parse(response.data));
        })
        .catch(() => {
            // setError('Server error, sorry, try again later');
        })
        .finally(() => {
            setTimeout(updateHistory, INTERVAL);
            finishLoading(MODULES.HISTORY);
        });
}
setTimeout(updateHistory, INTERVAL);

const removeLimitOrder = id => {
    const symbol = getCurrentSymbol();
    const accountId = getCurrentAccount()?.id;
    if (!symbol || !accountId) {
        setTimeout(updateHistory, INTERVAL);
        return;
    }

    startLoading(MODULES.HISTORY);
    RestRequest.delete(endpoints.orders.history, {symbol_id: symbol.id, account_id: accountId, id}, {})
        .then(response => {
            // setHistory(JSON.parse(response.data));
        })
        .catch(() => {
            // setError('Server error, sorry, try again later');
        })
        .finally(() => {
            finishLoading(MODULES.HISTORY);
        });
}

export default {
    removeLimitOrder
}
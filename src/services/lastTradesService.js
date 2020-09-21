import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setError} from '../providers/alertsProvider';
import {setLastTrades} from '../providers/lastTradesProvider';
import {finishLoading} from '../providers/loaderProvider';

const INTERVAL = 1000;

const updateLastTrades = () => {
    const symbol = getCurrentSymbol();
    if (!symbol) {
        setTimeout(updateLastTrades, INTERVAL);
        return;
    }

    RestRequest.get(endpoints.orders.trades, {symbol_id: symbol.id}, {})
        .then(response => {
            setLastTrades(JSON.parse(response.data));
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
        })
        .finally(() => {
            setTimeout(updateLastTrades, INTERVAL);
            finishLoading(MODULES.LAST_TRADES);
        });
}
setTimeout(updateLastTrades, INTERVAL);
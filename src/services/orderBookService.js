import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setOrderBook} from '../providers/orderBookProvider';
import {setError} from '../providers/alertsProvider';
import {finishLoading} from '../providers/loaderProvider';

const INTERVAL = 1000;

const updateOrderBook = () => {
    const symbol = getCurrentSymbol();
    if (!symbol) {
        setTimeout(updateOrderBook, INTERVAL);
        return;
    }

    RestRequest.get(endpoints.orders.book, {symbol_id: symbol.id}, {})
        .then(response => {
            symbol === getCurrentSymbol() && setOrderBook(JSON.parse(response.data));
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
        })
        .finally(() => {
            setTimeout(updateOrderBook, INTERVAL);
            symbol === getCurrentSymbol() && finishLoading(MODULES.ORDER_BOOK);
        });
}
setTimeout(updateOrderBook, INTERVAL);
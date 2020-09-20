import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setOrderBook} from '../providers/orderBookProvider';
import {setError} from '../providers/alertsProvider';

const INTERVAL = 1000;

const updateOrderBook = () => {
    const symbol = getCurrentSymbol();
    if (!symbol) {
        setTimeout(updateOrderBook, INTERVAL);
        return;
    }

    RestRequest.get(endpoints.orders.book, {symbol_id: symbol.id}, {})
        .then(response => {
            setOrderBook(JSON.parse(response.data));
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
        })
        .finally(() => setTimeout(updateOrderBook, INTERVAL));
}
setTimeout(updateOrderBook, INTERVAL);
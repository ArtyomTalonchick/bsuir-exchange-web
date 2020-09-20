import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {setError, setSuccess} from '../providers/alertsProvider';
import {getCurrentAccount} from '../providers/accountsProvider';
import {getCurrentSymbol} from '../providers/symbolsProvider';

const _create = data => RestRequest.post(endpoints.orders.create, {}, data);

const createOrder = _data => {
    const symbol = getCurrentSymbol();
    const account = getCurrentAccount();
    if (!symbol || !account) {
        !symbol && setError('Symbol not selected');
        !account && setError('Account not selected');
        return;
    }
    const data = {..._data, symbol_id: symbol.id, account_id: account.id};
    return _create(data)
        .then(response => {
            // setOrderBook(JSON.parse(response.data));
            setSuccess('Order was successfully created');
            return true;
        })
        .catch(reason => {
            const message = reason.response.status === 400 ? reason.response.data : 'Server error, sorry, try again later';
            setError(message);
            return false;
        });
}

export default {
    createOrder
}
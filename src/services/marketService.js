import {setError, setSuccess} from '../providers/alertsProvider';
import {getCurrentAccount} from '../providers/accountsProvider';

const createOrder = props => {
    setTimeout(() => {
        const accountId = getCurrentAccount()?.id;
        const data = {...props, account_id: accountId};
        if (accountId) {
            setSuccess('Order was successfully created');
            return new Promise((resolve => resolve()));
        } else {
            setError('Select an account and try again');
            return new Promise(((resolve, reject) => reject()));
        }
    }, 500);
}

export default {
    createOrder
}
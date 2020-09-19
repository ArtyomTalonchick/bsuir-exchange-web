import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {finishLoading, startLoading} from '../components/withLoader';
import {setError} from '../components/withAlert';
import {setAccounts} from '../components/withAccounts';

const create = name => {
    startLoading();
    return RestRequest.post(endpoints.accounts.create, {}, {name})
        .then(response => {
            const accounts = JSON.parse(response.data);
            setAccounts(accounts);
            return accounts;
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
            return null;
        })
        .finally(finishLoading);
}

export default {
    create
}
import {RestRequest} from './requestService';
import {endpoints} from '../constants/endpoints';
import {MODULES} from '../constants/loadingModules';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setChartData} from '../providers/chartDataProvider';
import {setError} from '../providers/alertsProvider';
import {finishLoading, startLoading} from '../providers/loaderProvider';

const getLocalISO = date =>
    new Date(date.setSeconds(0) - (new Date()).getTimezoneOffset() * 60000).toISOString().split('.')[0];

export const defaultDate = {
    start: getLocalISO(new Date (new Date().setDate(new Date().getDate() - 1))),
    end: getLocalISO(new Date()),
}

let lastParams = {
    left_date: defaultDate.start,
    right_date: defaultDate.end,
    interval: '1h',
    side: 1,
};

const updateChartData = _params => {
    const symbol = getCurrentSymbol();
    if (!symbol) {
        // setError('Symbol not selected');
        return;
    }

    const params = {...lastParams, ..._params, symbol_id: symbol.id};
    lastParams = {...params};

    startLoading(MODULES.CHART);
    RestRequest.get(endpoints.orders.stats, params, {})
        .then(response => {
            const data = JSON.parse(response.data)?.map(v => ({...v, date: new Date(v.date)}));
            setChartData(data);
        })
        .catch(() => {
            setError('Server error, sorry, try again later');
        })
        .finally(() => {
            finishLoading(MODULES.CHART)
        });
}

export default {
    updateChartData
}
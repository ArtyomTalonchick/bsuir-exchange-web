import {MODULES} from '../constants/loadingModules';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setChartData} from '../providers/chartDataProvider';
import {setError} from '../providers/alertsProvider';
import {finishLoading, startLoading} from '../providers/loaderProvider';

const chartData = [
    {close: 15.710416, date: new Date('2020-09-13T03:24:58')},
    {close: 16.710416, date: new Date('2020-09-13T03:25:00')},
    {close: 14.431016, date: new Date('2020-09-13T03:25:01')},
    {close: 17.710416, date: new Date('2020-09-13T03:25:03')},
    {close: 19.710416, date: new Date('2020-09-13T03:25:05')},
    {close: 13.710416, date: new Date('2020-09-13T03:25:06')},
    {close: 14.710416, date: new Date('2020-09-13T03:25:07')},
    {close: 12.710416, date: new Date('2020-09-13T03:25:08')},
    {close: 16.810416, date: new Date('2020-09-13T03:25:09')},
    {close: 15.710416, date: new Date('2020-09-13T03:25:10')},
    {close: 19.710416, date: new Date('2020-09-13T03:25:11')},
    {close: 13.310416, date: new Date('2020-09-13T03:25:13')},
    {close: 17.710416, date: new Date('2020-09-13T03:25:15')},
    {close: 16.430416, date: new Date('2020-09-13T03:25:20')},
    {close: 15.753424, date: new Date('2020-09-13T03:25:22')},
    {close: 12.715432, date: new Date('2020-09-13T03:25:23')},
    {close: 14.713465, date: new Date('2020-09-13T03:25:23')},
    {close: 15.234504, date: new Date('2020-09-13T03:26:01')},
    {close: 15.651041, date: new Date('2020-09-13T03:26:11')},
    {close: 13.134041, date: new Date('2020-09-13T03:26:12')},
    {close: 15.341041, date: new Date('2020-09-13T03:26:13')},
    {close: 16.710416, date: new Date('2020-09-13T03:26:14')},
];


const updateChartData = () => {
    const symbol = getCurrentSymbol();
    if (!symbol) {
        setError('Symbol not selected');
        return;
    }

    startLoading(MODULES.CHART);
    new Promise(resolve => setTimeout(() => resolve({data: JSON.stringify(chartData)}), 700))
        .then(response => {
            setChartData(JSON.parse(response.data));
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
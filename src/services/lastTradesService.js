import {finishLoading, startLoading} from '../providers/loaderProvider';
import {setLastTrades} from '../providers/lastTradesProvider';
import {getCurrentSymbol} from "../providers/symbolsProvider";

const lastTrades = [
    {id: 0, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 1, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 2, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 3, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 4, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 5, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 6, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 7, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 8, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 9, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 10, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 11, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 12, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 13, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 14, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 15, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 16, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 17, time: '08-02-2020', price: '12321', volume: '100', type: 1},
    {id: 18, time: '08-02-2020', price: '12321', volume: '100', type: 0},
    {id: 19, time: '08-02-2020', price: '12321', volume: '100', type: 1},
];

const updateLastTrades = () => {
    startLoading();
    setTimeout(() => {
        const symbol = getCurrentSymbol();
        setLastTrades(lastTrades);
        finishLoading();
    }, 300);
}

export default {
    updateLastTrades
}
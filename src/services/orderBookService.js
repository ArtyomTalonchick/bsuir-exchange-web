import {finishLoading, startLoading} from '../providers/loaderProvider';
import {getCurrentSymbol} from '../providers/symbolsProvider';
import {setOrderBook} from '../providers/orderBookProvider';

const orderBook = {
    sell: [
        {id: 0, price: '12329', volume: '100'},
        {id: 1, price: '12328', volume: '100'},
        {id: 2, price: '12327', volume: '100'},
        {id: 3, price: '12326', volume: '100'},
        {id: 4, price: '12325', volume: '100'},
        {id: 5, price: '12324', volume: '100'},
        {id: 6, price: '12323', volume: '100'},
        {id: 7, price: '12322', volume: '100'},
        {id: 8, price: '12321', volume: '100'},
        {id: 9, price: '12320', volume: '100'}
    ],
    buy: [
        {id: 0, price: '12319', volume: '100'},
        {id: 1, price: '12318', volume: '100'},
        {id: 2, price: '12317', volume: '100'},
        {id: 3, price: '12316', volume: '100'},
        {id: 4, price: '12315', volume: '100'},
        {id: 5, price: '12314', volume: '100'},
        {id: 6, price: '12313', volume: '100'},
        {id: 7, price: '12312', volume: '100'},
        {id: 8, price: '12311', volume: '100'},
        {id: 9, price: '12310', volume: '100'}
    ],
};

const updateOrderBook = () => {
    startLoading();
    setTimeout(() => {
        const symbol = getCurrentSymbol();
        if (!symbol) return;
        setOrderBook(orderBook);
        finishLoading();
    }, 300);
}

export default {
    updateOrderBook
}
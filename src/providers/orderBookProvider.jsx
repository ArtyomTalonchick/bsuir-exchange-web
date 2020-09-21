import React from 'react';
import {BehaviorSubject} from 'rxjs';

import {MODULES} from '../constants/loadingModules';
import {onSymbolChangeSubscribe} from './symbolsProvider';
import {startLoading} from './loaderProvider';

import '../services/orderBookService';

let orderBook = {sell: [], buy: []};

const orderBook$ = new BehaviorSubject(orderBook);

// let onSymbolChangeSubscription;
// setTimeout(() => onSymbolChangeSubscription = onSymbolChangeSubscribe(orderBookService.updateOrderBook));

export const setOrderBook = _orderBook => {
    orderBook = _orderBook;
    orderBook$.next(orderBook);
};

setTimeout(() => {
    startLoading(MODULES.ORDER_BOOK);
    onSymbolChangeSubscribe(() => {
        startLoading(MODULES.ORDER_BOOK);
        setOrderBook({sell: [], buy: []})
    })
});

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {orderBook};
        }

        componentDidMount() {
            this.subscription = orderBook$.subscribe(orderBook =>
                this.setState({orderBook})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    orderBook={this.state.orderBook}
                />
            );
        }
    };
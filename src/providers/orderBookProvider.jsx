import React from 'react';
import {BehaviorSubject} from 'rxjs';
import {onSymbolChangeSubscribe} from './symbolsProvider';
import orderBookService from '../services/orderBookService';

let orderBook = {sell: [], buy: []};

const orderBook$ = new BehaviorSubject(orderBook);

let onSymbolChangeSubscription;
setTimeout(() => onSymbolChangeSubscription = onSymbolChangeSubscribe(orderBookService.updateOrderBook));

export const setOrderBook = _orderBook => {
    orderBook = _orderBook;
    orderBook$.next(orderBook);
};

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
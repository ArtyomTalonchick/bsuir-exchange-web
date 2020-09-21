import React from 'react';
import {BehaviorSubject} from 'rxjs';

import {MODULES} from '../constants/loadingModules';
import {onSymbolChangeSubscribe} from './symbolsProvider';
import {startLoading} from './loaderProvider';

import '../services/lastTradesService';

let lastTrades = [];

const lastTrades$ = new BehaviorSubject(lastTrades);

// let onSymbolChangeSubscription;
// setTimeout(() => onSymbolChangeSubscription = onSymbolChangeSubscribe(lastTradesService.updateLastTrades));

export const setLastTrades = _lastTrades => {
    lastTrades = _lastTrades;
    lastTrades$.next(lastTrades);
};

setTimeout(() => {
    startLoading(MODULES.LAST_TRADES);
    onSymbolChangeSubscribe(() => {
        startLoading(MODULES.LAST_TRADES);
        setLastTrades([]);
    });
});

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {lastTrades};
        }

        componentDidMount() {
            this.subscription = lastTrades$.subscribe(lastTrades =>
                this.setState({lastTrades})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    lastTrades={this.state.lastTrades}
                />
            );
        }
    };
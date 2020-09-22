import React from 'react';
import {BehaviorSubject} from 'rxjs';

import {MODULES} from '../constants/loadingModules';
import {onSymbolChangeSubscribe} from './symbolsProvider';
import {startLoading} from './loaderProvider';

import '../services/historyService';

let history = [];

const history$ = new BehaviorSubject(history);

export const setHistory = _history => {
    history = _history;
    history$.next(history);
};

setTimeout(() => {
    startLoading(MODULES.HISTORY);
    onSymbolChangeSubscribe(() => {
        startLoading(MODULES.HISTORY);
        setHistory([]);
    })
});

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {history};
        }

        componentDidMount() {
            this.subscription = history$.subscribe(history =>
                this.setState({history})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    history={this.state.history}
                />
            );
        }
    };
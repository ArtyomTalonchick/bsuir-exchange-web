import React from 'react';
import {BehaviorSubject} from 'rxjs';
import symbolsServices from '../services/symbolsServices';

let symbols = [];
try {
    symbols = JSON.parse(localStorage.getItem('User')).symbols || [];
} catch {
}

symbolsServices.getAll();

const symbols$ = new BehaviorSubject(symbols);

export const setSymbols = _symbols => {
    symbols = _symbols;
    symbols$.next(symbols);
};

export const setCurrentSymbol = id => {
    const index = symbols.findIndex(s => s.id === id);
    if (index === -1) return;

    const _symbols = [...symbols];
    const [currentSymbol] = _symbols.splice(index, 1);
    _symbols.unshift(currentSymbol);
    setSymbols(_symbols);
}

export const getCurrentSymbol = () => symbols.length ? symbols[0] : null;

export const onSymbolChangeSubscribe = handler => symbols$.subscribe(handler);

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {symbols};
        }

        componentDidMount() {
            this.subscription = symbols$.subscribe(symbols =>
                this.setState({symbols})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    symbols={this.state.symbols}
                    setCurrentSymbol={setCurrentSymbol}
                    getCurrentSymbol={getCurrentSymbol}
                />
            );
        }
    };
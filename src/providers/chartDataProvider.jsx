import React from 'react';
import {BehaviorSubject} from 'rxjs';

import {getCurrentSymbol, onSymbolChangeSubscribe} from './symbolsProvider';
import chartDataService from '../services/chartDataService';

let chartData = [];

const chartData$ = new BehaviorSubject(chartData);

export const setChartData = _chartData => {
    chartData = _chartData;
    chartData$.next(chartData);
};

setTimeout(() => onSymbolChangeSubscribe(() => {
    setChartData([]);
    getCurrentSymbol() && chartDataService.updateChartData();
}));

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {chartData};
        }

        componentDidMount() {
            this.subscription = chartData$.subscribe(chartData =>
                this.setState({chartData})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    chartData={this.state.chartData}
                />
            );
        }
    };
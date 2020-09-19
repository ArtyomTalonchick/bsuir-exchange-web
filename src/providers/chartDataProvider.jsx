import React from 'react';
import {BehaviorSubject} from 'rxjs';
import {onSymbolChangeSubscribe} from './symbolsProvider';
import chartDataService from '../services/chartDataService';

let chartData = [];

const chartData$ = new BehaviorSubject(chartData);

let onSymbolChangeSubscription;
setTimeout(() => onSymbolChangeSubscription = onSymbolChangeSubscribe(chartDataService.updateChartData));

export const setChartData = _chartData => {
    chartData = _chartData;
    chartData$.next(chartData);
};

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
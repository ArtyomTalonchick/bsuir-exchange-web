import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import withAlert from './components/withAlert';
import Header from './components/header/Header';
import OrderBook from './components/orderBook/OrderBook';
import Chart from './components/chart/Chart';
import LastTrades from './components/lastTrades/LastTrades';

import './App.scss';
import MarketWatch from "./components/marketWatch/MarketWatch";
import Market from "./components/market/Market";

class App extends React.Component {
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    autoHideDuration={3000}
                    open={!!this.props.error}
                    onClose={this.props.clearError}>
                    <Alert onClose={this.props.clearError} severity='error'>
                        {this.props.error}
                    </Alert>
                </Snackbar>
                <Header/>
                <div className='main-container _df-aic-jcsb'>
                    <MarketWatch/>
                    <div className='main-pair-inner'>
                        <OrderBook/>
                        <Market/>
                    </div>
                    <Chart/>
                    <LastTrades/>
                </div>
            </div>
        );
    }
}

export default withAlert(App);
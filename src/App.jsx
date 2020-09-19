import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {Snackbar, Backdrop, CircularProgress} from '@material-ui/core';

import {withProviders} from './helpers/providersHelper';
import alertsProvider from './providers/alertsProvider';
import loaderProvider from './providers/loaderProvider';
import Header from './components/header/Header';
import OrderBook from './components/orderBook/OrderBook';
import Chart from './components/chart/Chart';
import LastTrades from './components/lastTrades/LastTrades';
import MarketWatch from './components/marketWatch/MarketWatch';
import Market from './components/market/Market';

import './App.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <Backdrop open={this.props.loading} className='loader'>
                    <CircularProgress color='inherit'/>
                </Backdrop>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    autoHideDuration={3000}
                    open={!!this.props.message}
                    onClose={this.props.clearMessage}>
                    <Alert onClose={this.props.clearError} severity={this.props.message?.type}>
                        {this.props.message?.text}
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

export default withProviders(App, [alertsProvider, loaderProvider]);
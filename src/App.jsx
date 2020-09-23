import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {Snackbar, Backdrop, CircularProgress} from '@material-ui/core';

import {withProviders} from './helpers/providersHelper';
import alertsProvider from './providers/alertsProvider';
import loaderProvider from './providers/loaderProvider';
import userProvider from './providers/userProvider';
import {showGlobalLoader} from './helpers/loadingHelper';
import Header from './components/header/Header';
import OrderBook from './components/orderBook/OrderBook';
import Chart from './components/chart/Chart';
import LastTrades from './components/lastTrades/LastTrades';
import MarketWatch from './components/marketWatch/MarketWatch';
import Market from './components/market/Market';
import History from './components/history/History';

import './App.scss';

class App extends React.Component {

    showLoader = () => showGlobalLoader(this.props.loadingModules);

    render() {
        return (
            <div>
                <Backdrop open={this.showLoader()} className='loader'>
                    <CircularProgress color='inherit'/>
                </Backdrop>
                {!!this.props.message &&
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    autoHideDuration={3000}
                    open={!!this.props.message}
                    onClose={this.props.clearMessage}>
                    <Alert onClose={this.props.clearMessage} severity={this.props.message?.type}>
                        {this.props.message?.text}
                    </Alert>
                </Snackbar>
                }
                <Header/>
                <div className='app-container'>
                    <div className='main-container _df-aic-jcsb'>
                        <MarketWatch/>
                        <div className='main-pair-inner'>
                            <OrderBook/>
                            <Market/>
                        </div>
                        <Chart/>
                        <LastTrades/>
                    </div>
                    {this.props.user &&
                    <div className='app-history-container'>
                        <History/>
                    </div>}
                </div>
            </div>
        );
    }
}

export default withProviders(App, [alertsProvider, loaderProvider, userProvider]);
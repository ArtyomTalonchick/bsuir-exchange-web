import React from 'react';
import {IconButton, MenuItem, Paper, TextField, Tooltip} from '@material-ui/core';

import {ORDER_SIDES} from '../../constants/constants';
import {MODULES} from '../../constants/loadingModules';
import {showModuleLoader} from '../../helpers/loadingHelper';
import {withProviders} from '../../helpers/providersHelper';
import chartDataProvider from '../../providers/chartDataProvider';
import loaderProvider from '../../providers/loaderProvider';
import Loader from '../loader/Loader';
import TradingChartCanvas from './canvas/TradingChartCanvas';

import './Chart.scss';
import chartDataService, {defaultDate} from '../../services/chartDataService';

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: defaultDate.start,
            endDate: defaultDate.end,
            interval: '1h',
            side: 1,
            lastSide: 1,
            isValid: true,
        }
    }

    onChangeDate = e => {
        const state = {...this.state, [e.target.name]: e.target.value};
        state.isValid = new Date(state.endDate) > new Date(state.startDate);
        this.setState(state);
    }

    onChangeField = e => this.setState({[e.target.name]: e.target.value});

    onUpdate = () => {
        if (!this.state.isValid) return;

        chartDataService.updateChartData({
            left_date: new Date(this.state.startDate).toISOString().split('.')[0],
            right_date: new Date(this.state.endDate).toISOString().split('.')[0],
            interval: this.state.interval,
            side: this.state.side,
        });
        this.setState({lastSide: this.state.side});
    }

    render() {
        return (
            <Paper className='block-container chart-container'>
                {showModuleLoader(this.props.loadingModules, MODULES.CHART)
                    ?
                    <Loader/>
                    :
                    <>
                        <div className='_df-aic-jcsa'>
                            <TextField
                                label='Start date'
                                type='datetime-local'
                                name='startDate'
                                className='chart__date'
                                error={!this.state.isValid}
                                value={this.state.startDate}
                                onChange={this.onChangeDate}
                                inputProps={{max: new Date().toISOString().split('.')[0]}}
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField
                                label='End date'
                                type='datetime-local'
                                name='endDate'
                                className='chart__date'
                                error={!this.state.isValid}
                                value={this.state.endDate}
                                onChange={this.onChangeDate}
                                inputProps={{max: new Date().toISOString().split('.')[0]}}
                                InputLabelProps={{shrink: true}}
                            />
                        </div>

                        <div className='_df-aic-jcsa'>
                            <TextField
                                select
                                // label='Interval'
                                name='interval'
                                value={this.state.interval}
                                onChange={this.onChangeField}
                            >
                                {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'].map(v => (
                                    <MenuItem key={v} value={v}>
                                        {v}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                // label='Side'
                                name='side'
                                value={this.state.side}
                                onChange={this.onChangeField}
                            >
                                {[{t: 'Buy', v: ORDER_SIDES.BUY}, {t: 'Sell', v: ORDER_SIDES.SELL}].map(({t, v}) => (
                                    <MenuItem key={v} value={v}>
                                        {t}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Tooltip title='Update'>
                                <IconButton onClick={this.onUpdate} disabled={!this.state.isValid}
                                            className='chart__submit'>
                                    <i className='fa fa-retweet'/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className='chart__inner'>
                            {this.props.chartData.length > 1
                                ?
                            <TradingChartCanvas data={this.props.chartData} side={this.state.lastSide}/>
                            :
                                'Sorry, there is no data with the specified settings'
                            }
                        </div>
                    </>
                }
            </Paper>
        );
    }
}

export default withProviders(Chart, [chartDataProvider, loaderProvider]);
import React from 'react';
import {Backdrop, CircularProgress, Paper} from '@material-ui/core';

import {withProviders} from '../../helpers/providersHelper';
import chartDataProvider from '../../providers/chartDataProvider';
import loaderProvider from '../../providers/loaderProvider';
import TraidingChartCanvas from './canvas/TraidingChartCanvas';

import './Chart.scss';

class Chart extends React.Component {
    render() {
        return (
            <Paper className='block-container chart-container'>
                {this.props.chartData.length > 10
                    ? <TraidingChartCanvas data={this.props.chartData}/>
                    : !this.props.loading && <CircularProgress color='inherit'/>
                }
            </Paper>
        );
    }
}

export default withProviders(Chart, [chartDataProvider, loaderProvider]);
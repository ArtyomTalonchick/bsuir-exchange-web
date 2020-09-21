import React from 'react';
import {Paper} from '@material-ui/core';

import {MODULES} from '../../constants/loadingModules';
import {showModuleLoader} from '../../helpers/loadingHelper';
import {withProviders} from '../../helpers/providersHelper';
import chartDataProvider from '../../providers/chartDataProvider';
import loaderProvider from '../../providers/loaderProvider';
import Loader from '../loader/Loader';
import TraidingChartCanvas from './canvas/TraidingChartCanvas';

import './Chart.scss';

class Chart extends React.Component {

    render() {
        return (
            <Paper className='block-container chart-container'>
                {showModuleLoader(this.props.loadingModules, MODULES.CHART)
                    ?
                    <Loader/>
                    :
                    this.props.chartData.length > 1 && <TraidingChartCanvas data={this.props.chartData}/>
                }
            </Paper>
        );
    }
}

export default withProviders(Chart, [chartDataProvider, loaderProvider]);
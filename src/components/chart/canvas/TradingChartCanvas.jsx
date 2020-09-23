import React from 'react';

import {scaleTime} from 'd3-scale';
import {timeFormat} from 'd3-time-format';

import {ChartCanvas, Chart} from 'react-stockcharts';
import {AreaSeries} from 'react-stockcharts/lib/series';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {createVerticalLinearGradient, hexToRGBA} from 'react-stockcharts/lib/utils';
import {HoverTooltip} from 'react-stockcharts/lib/tooltip';
import {EdgeIndicator} from 'react-stockcharts/lib/coordinates';

import {ORDER_SIDES} from '../../../constants/constants';

const CHART_ID = 'CHART_ID';

class TradingChartCanvas extends React.Component {

    componentDidMount() {
        document.getElementById(CHART_ID).addEventListener('wheel', this.wheelHandler);
    }

    componentWillUnmount() {
        document.getElementById(CHART_ID).removeEventListener('wheel', this.wheelHandler);
    }

    wheelHandler = e => e.preventDefault()

    getColor = () => this.props.side === ORDER_SIDES.BUY ? '#1B5E20' : '#BF360C';

    getCanvasGradient = () => createVerticalLinearGradient([
        {stop: 0, color: hexToRGBA(this.getColor(), 0.1)},
        {stop: 0.7, color: hexToRGBA(this.getColor(), 0.3)},
        {stop: 1, color: hexToRGBA(this.getColor(), 0.4)}
    ])

    getTooltip = ({currentItem, xAccessor}) => ({
        x: timeFormat('%Y-%m-%d - %H-%M-%S')(xAccessor(currentItem)),
        y: [
            {
                label: 'Price',
                value: currentItem.price
            }
        ]
    });

    render() {
        return (
            <div id={CHART_ID}>
                <ChartCanvas
                    // type='svg'
                    ratio={1}
                    width={this.props.width}
                    height={400}
                    margin={{left: 50, right: 50, top: 10, bottom: 30}}
                    data={this.props.data}
                    xAccessor={d => d.date}
                    xScale={scaleTime()}
                    // clamp={true}
                >
                    <Chart yExtents={(d) => d.price}>
                        <HoverTooltip
                            stroke={hexToRGBA('#415757', 1)}
                            fill={hexToRGBA('#415757', 0.5)}
                            fontFill={hexToRGBA('#FFFFFF', 1)}
                            bgFill={hexToRGBA('#415757', 0.1)}
                            tooltipContent={this.getTooltip}
                        />
                        <EdgeIndicator
                            itemType='last'
                            orient='right'
                            edgeAt='right'
                            yAccessor={d => d.price}
                            fill={hexToRGBA('#415757', 1)}
                        />
                        <XAxis axisAt='bottom' orient='bottom' ticks={5}/>
                        <YAxis axisAt='left' orient='left'/>
                        <AreaSeries
                            stroke={hexToRGBA(this.getColor(), 1)}
                            yAccessor={d => d.price}
                            canvasGradient={this.getCanvasGradient()}
                        />
                    </Chart>
                </ChartCanvas>
            </div>
        );
    }
}

export default fitWidth(TradingChartCanvas);

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

const canvasGradient = createVerticalLinearGradient([
    {stop: 0, color: hexToRGBA('#f9aa33', 0.1)},
    {stop: 0.7, color: hexToRGBA('#f9aa33', 0.3)},
    {stop: 1, color: hexToRGBA('#f9aa33', 0.5)}
]);

class AreaChart extends React.Component {
    constructor(props) {
        super(props);
    }

    getTooltip = ({currentItem, xAccessor}) => ({
        x: timeFormat('%Y-%m-%d - %H-%M-%S')(xAccessor(currentItem)),
        y: [
            {
                label: 'Price',
                value: currentItem.close
            }
        ]
    });

    render() {
        // const dataLength = this.props.data.length;
        // const startDate = this.props.data[dataLength > 10 ? dataLength - 10 : 0].date;
        // const lastDate = this.props.data[dataLength > 1 ? dataLength - 1 : 0].date;
        return (
            <ChartCanvas
                ratio={1}
                width={this.props.width}
                height={500}
                margin={{left: 50, right: 50, top: 10, bottom: 30}}
                data={this.props.data}
                xAccessor={d => d.date}
                xScale={scaleTime()}
                // xExtents={[startDate, lastDate]}
                // clamp={true}
            >
                <Chart yExtents={(d) => d.close}>
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
                        yAccessor={d => d.close}
                        fill={hexToRGBA('#415757', 1)}
                    />
                    <XAxis axisAt='bottom' orient='bottom' ticks={5}/>
                    <YAxis axisAt='left' orient='left'/>
                    <AreaSeries
                        stroke={hexToRGBA('#f9aa33', 1)}
                        yAccessor={d => d.close}
                        canvasGradient={canvasGradient}
                    />
                </Chart>
            </ChartCanvas>
        );
    }
}

export default fitWidth(AreaChart);

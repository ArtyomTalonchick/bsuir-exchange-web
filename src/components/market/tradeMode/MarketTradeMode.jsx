import React from 'react';
import {TextField} from '@material-ui/core';

import {withProviders} from '../../../helpers/providersHelper';
import orderBookProvider from '../../../providers/orderBookProvider';
import {ORDER_TYPES} from '../../../constants/constants';
import MarketButtons from '../buttons/MarketButtons';

import './MarketTradeMode.scss';

class MarketTradeMode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
        };
    }

    onChangeField = e => e.target.value >= 0 && this.setState({[e.target.name]: e.target.value});

    onSubmit = props => this.props.onSubmit({
        ...props,
        type: ORDER_TYPES.MARKET,
        volume: +this.state.amount
    });

    render() {
        const sellPrice = this.props.orderBook.buy[0]?.price;
        const buyPrice = this.props.orderBook.sell.slice(-1)[0]?.price;
        return (
            <div className={`market__mode${this.props.hidden ? ' _hidden' : ''}`}>
                <TextField
                    type='number'
                    step='0.01'
                    label='Amount'
                    name='amount'
                    value={this.state.amount}
                    onChange={this.onChangeField}
                    fullWidth
                    inputProps={{
                        autoComplete: 'off',
                        min: 0,
                    }}
                />
                <div className='_df-aic-jcsa'>
                    <span className='market-price _sell'>
                        {sellPrice?.toFixed(2) || '-'}
                    </span>
                    <span className='market-price _buy'>
                        {buyPrice?.toFixed(2) || '-'}
                    </span>
                </div>
                <MarketButtons
                    onSubmit={this.onSubmit}
                    disabledSell={!sellPrice || !this.state.amount}
                    disabledBuy={!buyPrice || !this.state.amount}
                />
            </div>
        );
    }
}

export default withProviders(MarketTradeMode, [orderBookProvider]);
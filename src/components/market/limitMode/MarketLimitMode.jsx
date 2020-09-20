import React from 'react';
import {TextField} from '@material-ui/core';

import MarketButtons from '../buttons/MarketButtons';
import {ORDER_TYPES} from '../../../constants/constants';

class MarketLimitMode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            price: 0,
        };
    }

    onChangeField = e => e.target.value >= 0 && this.setState({[e.target.name]: e.target.value});

    onSubmit = props => this.props.onSubmit({
        ...props,
        type: ORDER_TYPES.LIMIT,
        volume: +this.state.amount,
        price: +this.state.price
    });

    render() {
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
                <TextField
                    type='number'
                    step='0.01'
                    label='Price'
                    name='price'
                    value={this.state.price}
                    onChange={this.onChangeField}
                    fullWidth
                    inputProps={{
                        autoComplete: 'off',
                        min: 0,
                    }}
                />
                <MarketButtons
                    onSubmit={this.onSubmit}
                    disabledSell={!this.state.amount || !this.state.price}
                    disabledBuy={!this.state.amount || !this.state.price}
                />
            </div>
        );
    }
}

export default (MarketLimitMode);
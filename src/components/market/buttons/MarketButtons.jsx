import React from 'react';
import {Button} from '@material-ui/core';

import {ORDER_SIDES} from '../../../constants/constants';

import './MarketButtons.scss';

class MarketButtons extends React.Component {

    onSell = () => this.props.onSubmit({side: ORDER_SIDES.SELL});
    onBuy = () => this.props.onSubmit({side: ORDER_SIDES.BUY});
    
    render() {
        return (
            <div className='_df-aic-jcsa'>
                <Button className='market-buttons _sell' onClick={this.onSell} disabled={this.props.disabledSell}>
                    SELL
                </Button>
                <Button className='market-buttons _buy' onClick={this.onBuy} disabled={this.props.disabledBuy}>
                    BUY
                </Button>
            </div>
        );
    }
}

export default MarketButtons;
import React from 'react';
import {Button} from '@material-ui/core';

import {withProviders} from '../../../helpers/providersHelper';
import userProvider from '../../../providers/userProvider';
import {ORDER_SIDES} from '../../../constants/constants';

import './MarketButtons.scss';

class MarketButtons extends React.Component {

    onSell = () => this.props.onSubmit({side: ORDER_SIDES.SELL});
    onBuy = () => this.props.onSubmit({side: ORDER_SIDES.BUY});

    render() {
        return (
            <div className='_df-aic-jcsa'>
                <Button className='market-buttons _sell' onClick={this.onSell}
                        disabled={this.props.disabledSell || !this.props.user}>
                    SELL
                </Button>
                <Button className='market-buttons _buy' onClick={this.onBuy}
                        disabled={this.props.disabledBuy || !this.props.user}>
                    BUY
                </Button>
            </div>
        );
    }
}

export default withProviders(MarketButtons, [userProvider]);
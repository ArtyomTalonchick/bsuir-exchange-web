import React from 'react';
import {MenuItem, TextField} from '@material-ui/core';

import currenciesService from '../../services/currenciesService';
import assetsService from '../../services/assetsService';
import validateHelper from '../../helpers/validateHelper';
import Window from '../window/Window';
import withAlert from '../withAlert';
import withUser from '../withUser';
import withLoader from '../withLoader';

import './AssetsWindow.scss';
import card1 from '../../static/card1.jpg';
import card2 from '../../static/card2.jpg';
import card3 from '../../static/card3.jpg';

const DEFAULT_STATE = {
    currencies: [],
    // fields
    owner: '',
    cvv: '',
    number: '',
    month: '01',
    year: '2020',
    amount: '',
    currencyId: '',
}

class AssetsWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            currenciesService.getAll()
                .then(currencies => this.setState({currencies, currencyId: currencies[0]?.id}));
        } else if (prevProps.open && !this.props.open) {
            this.setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
        }
    }

    onChangeField = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = () =>
        assetsService.create(+this.state.amount, this.state.currencyId)
            .then(success => success && this.props.onClose());

    render() {
        const submitDisabled = !(validateHelper.bankCardOwner(this.state.owner) && validateHelper.bankCardCvv(this.state.cvv)
            && validateHelper.bankCardNumber(this.state.number) && validateHelper.bankCardAmount(this.state.amount));
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                onCancel={this.props.onClose}
                onSubmit={this.onSubmit}
                submitDisabled={submitDisabled}
                title='Top up balance'
            >
                <div className='_padding'>
                    <div className='_df-aic-jcsb'>
                        <TextField
                            error={!validateHelper.bankCardOwner(this.state.owner)}
                            label='Owner'
                            variant='outlined'
                            name='owner'
                            value={this.state.owner}
                            onChange={this.onChangeField}
                            className='bank-card__field _owner'
                            fullWidth
                        />
                        <TextField
                            error={!validateHelper.bankCardCvv(this.state.cvv)}
                            label='CVV'
                            variant='outlined'
                            name='cvv'
                            value={this.state.cvv}
                            onChange={this.onChangeField}
                            className='bank-card__field _cvv'
                            fullWidth
                        />
                    </div>

                    <TextField
                        error={!validateHelper.bankCardNumber(this.state.number)}
                        label='Card number'
                        variant='outlined'
                        name='number'
                        value={this.state.number}
                        onChange={this.onChangeField}
                        className='bank-card__field _number'
                    />

                    <div className='bank-card__date'>
                        <TextField
                            select
                            label='Month'
                            name='month'
                            value={this.state.month}
                            onChange={this.onChangeField}
                        >
                            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((v) => (
                                <MenuItem key={v} value={v}>
                                    {v}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label='Year'
                            name='year'
                            value={this.state.year}
                            onChange={this.onChangeField}
                            className='bank-card__field _year'
                        >
                            {['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2080', '2029'].map((v) => (
                                <MenuItem key={v} value={v}>
                                    {v}
                                </MenuItem>
                            ))}
                        </TextField>

                        <img src={card1} alt=''/>
                        <img src={card2} alt=''/>
                        <img src={card3} alt=''/>
                    </div>

                    <div className='_df-aic-jcsb bank-card__values'>
                        <TextField
                            error={!validateHelper.bankCardAmount(this.state.amount)}
                            label='Amount'
                            variant='outlined'
                            name='amount'
                            value={this.state.amount}
                            onChange={this.onChangeField}
                            fullWidth
                        />
                        <TextField
                            select
                            label='Currency'
                            name='currencyId'
                            value={this.state.currencyId}
                            onChange={this.onChangeField}
                            className='bank-card__field _currency'
                        >
                            {this.state.currencies.map(({id, name}) => (
                                <MenuItem key={id} value={id}>
                                    {name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
            </Window>
        );
    }
}

export default withUser(withAlert(withLoader(AssetsWindow)));
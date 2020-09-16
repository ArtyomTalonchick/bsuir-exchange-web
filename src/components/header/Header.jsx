import React from 'react';
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem, Tooltip, IconButton} from '@material-ui/core';

import withUser from '../withUser';
import AuthWindow from '../authWindow/AuthWindow';

import './Header.scss';
import logo from '../../static/logo.png';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            assetsAnchorEl: null,
            accountsAnchorEl: null,
            openAuthWindow: false,
        };

    }

    onShowAssets = e => this.setState({assetsAnchorEl: e.currentTarget});
    onCloseAssets = () => this.setState({assetsAnchorEl: null});

    onShowAccounts = e => this.setState({accountsAnchorEl: e.currentTarget});
    onCloseAccounts = () => this.setState({accountsAnchorEl: null});

    onAddAccount = () => {
        console.log('onAddAccount');
    }

    onOpenAuthWindow = () => this.setState({openAuthWindow: true});
    onCloseAuthWindow = () => this.setState({openAuthWindow: false});

    onLogout = () => {
        this.props.login();
    }

    render() {
        const
            symbolName = 'USDEUR',
            assets = [
                {currencyName: 'USD', volume: 1000},
                {currencyName: 'EUR', volume: 1900},
                {currencyName: 'BTC', volume: 0.001},
                {currencyName: 'LTC', volume: 0},
            ],
            accounts = ['900934', '000021', '213431'];

        return (
            <AppBar position='static'>
                <Toolbar className='header _df-aic-jcsb'>

                    <div>
                        <img src={logo} className='header__logo _mrg-r' alt='BSUIR Eschange'/>
                        <Typography variant='h6' className='header__name'>
                            BSUIR Eschange
                        </Typography>
                    </div>

                    <div className='_df-aic-jcsa'>
                        <Typography variant='subtitle2'>
                            <span className='_mrg-r'>Current Symbol:</span><b>{symbolName}</b>
                        </Typography>
                        <Typography variant='subtitle2'>
                            <span className='_mrg-r'>Current Assets: </span>
                            <b className='_mrg-r'>USD: 1000</b> <b>EUR: 1900</b>
                        </Typography>

                        <Button onClick={this.onShowAssets} className='primary'>
                            Show Assets
                        </Button>
                        <Menu
                            anchorEl={this.state.assetsAnchorEl}
                            open={!!this.state.assetsAnchorEl}
                            onClose={this.onCloseAssets}
                            keepMounted
                            className='header__menu'
                        >
                            {assets.map(asset =>
                                <MenuItem key={asset.currencyName} className='asset-item'>
                                    <span className='_mrg-r'>{asset.currencyName}</span>
                                    <span>{asset.volume}</span>
                                </MenuItem>
                            )}
                        </Menu>
                    </div>

                    <div>
                        <Typography variant='subtitle2' className='_mrg-r'>
                            Account:
                        </Typography>
                        <Button onClick={this.onShowAccounts} className='primary'>
                            900934
                        </Button>
                        <Menu
                            anchorEl={this.state.accountsAnchorEl}
                            open={!!this.state.accountsAnchorEl}
                            onClose={this.onCloseAccounts}
                            keepMounted
                            className='header__menu'
                        >
                            {accounts.map(account => <MenuItem key={account}>{account}</MenuItem>)}
                            <MenuItem onClick={this.onAddAccount} className='_active'>Add new</MenuItem>
                        </Menu>
                    </div>

                    <div>
                        <Typography variant='subtitle2'>
                            {this.props.user ? 'Logout:' : 'Login'}
                        </Typography>
                        {this.props.user ?
                            <Tooltip title='Logout'>
                                <IconButton onClick={this.onLogout}>
                                    <i className='fa fa-sign-out'/>
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title='Login'>
                                <IconButton onClick={this.onOpenAuthWindow}>
                                    <i className='fa fa-sign-in'/>
                                </IconButton>
                            </Tooltip>
                        }
                    </div>

                    <AuthWindow open={this.state.openAuthWindow} onClose={this.onCloseAuthWindow}/>

                </Toolbar>
            </AppBar>
        );
    }
}

export default withUser(Header);
import React from 'react';
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem, Tooltip, IconButton} from '@material-ui/core';

import userService from '../../services/userService';
import {withProviders} from '../../helpers/providersHelper';
import userProvider from '../../providers/userProvider';
import accountsProvider from '../../providers/accountsProvider';
import assetsProvider from '../../providers/assetsProvider';
import symbolsProvider from '../../providers/symbolsProvider';
import AuthWindow from '../authWindow/AuthWindow';
import AccountWindow from '../accountWindow/AccountWindow';
import AssetsWindow from '../assetsWindow/AssetsWindow';

import './Header.scss';
import logo from '../../static/logo.png';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            assetsAnchorEl: null,
            accountsAnchorEl: null,
            openAuthWindow: false,
            openAccountWindow: false,
            openAssetsWindow: false,
        };

    }

    onShowAssets = e => this.setState({assetsAnchorEl: e.currentTarget});
    onCloseAssets = () => this.setState({assetsAnchorEl: null});

    onShowAccounts = e => this.setState({accountsAnchorEl: e.currentTarget});
    onCloseAccounts = () => this.setState({accountsAnchorEl: null});

    onOpenAccountWindow = () => this.setState({openAccountWindow: true, accountsAnchorEl: null});
    onCloseAccountWindow = () => this.setState({openAccountWindow: false});

    onOpenAuthWindow = () => this.setState({openAuthWindow: true});
    onCloseAuthWindow = () => this.setState({openAuthWindow: false});

    onOpenAssetsWindow = () => this.setState({openAssetsWindow: true, assetsAnchorEl: null});
    onCloseAssetsWindow = () => this.setState({openAssetsWindow: false});

    setCurrentAccount = id => {
        this.props.setCurrentAccount(id);
        this.onCloseAccounts();
    }

    render() {
        const currentAccount = this.props.getCurrentAccount();
        const currentSymbol = this.props.getCurrentSymbol();

        return (
            <AppBar position='static'>
                <Toolbar className='header _df-aic-jcsb'>

                    <div>
                        <div className='header__logo _mrg-r'>
                            <img src={logo} alt='BSUIR Eschange'/>
                        </div>
                        <Typography variant='h6' className='header__name'>
                            BSUIR Eschange
                        </Typography>
                    </div>

                    <div className='_df-aic-jcsa'>
                        <Typography variant='subtitle2'>
                            <span className='_mrg-r'>Current Symbol:</span><b>{currentSymbol?.name}</b>
                        </Typography>
                        <Typography variant='subtitle2'>
                            <span className='_mrg-r'>Current Assets: </span>
                            <b className='_mrg-r'>
                                {currentSymbol?.currency1?.name}: {this.props.getAssetByCurrencyId(currentSymbol?.currency1?.id)?.volume || 0}
                            </b>
                            <b>
                                {currentSymbol?.currency2?.name}: {this.props.getAssetByCurrencyId(currentSymbol?.currency2?.id)?.volume || 0}
                            </b>
                        </Typography>
                    </div>

                    <div>
                        <Button onClick={this.onShowAssets} disabled={!this.props.user} className='primary'>
                            Assets
                        </Button>
                        <Menu
                            anchorEl={this.state.assetsAnchorEl}
                            open={!!this.state.assetsAnchorEl}
                            onClose={this.onCloseAssets}
                            keepMounted
                            className='header__menu'
                        >
                            {this.props.assets.map(asset =>
                                <MenuItem key={asset.currencyName} onClick={this.onCloseAssets}>
                                    <span className='_mrg-r'>{asset.currency_name}</span>
                                    <span>{asset.volume}</span>
                                </MenuItem>
                            )}
                            <MenuItem onClick={this.onOpenAssetsWindow} className='_active'>Top up</MenuItem>
                        </Menu>
                    </div>

                    <div>
                        <Button onClick={this.onShowAccounts} disabled={!this.props.user} className='primary'>
                            Account
                        </Button>
                        <Menu
                            anchorEl={this.state.accountsAnchorEl}
                            open={!!this.state.accountsAnchorEl}
                            onClose={this.onCloseAccounts}
                            keepMounted
                            className='header__menu'
                        >
                            {this.props.accounts.map(({id, name}) =>
                                <MenuItem
                                    key={id}
                                    value={id}
                                    onClick={() => this.setCurrentAccount(id)}
                                    className={id === currentAccount.id ? '_selected' : ''}
                                >
                                    {name}
                                </MenuItem>
                            )}
                            <MenuItem onClick={this.onOpenAccountWindow} className='_active'>Add new</MenuItem>
                        </Menu>
                    </div>

                    <div>
                        <Typography variant='subtitle2'>
                            {this.props.user ? 'Logout:' : 'Login'}
                        </Typography>
                        {this.props.user ?
                            <Tooltip title='Logout'>
                                <IconButton onClick={userService.logout}>
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

                    <AccountWindow open={this.state.openAccountWindow} onClose={this.onCloseAccountWindow}/>

                    <AssetsWindow open={this.state.openAssetsWindow} onClose={this.onCloseAssetsWindow}/>

                </Toolbar>
            </AppBar>
        );
    }
}

export default withProviders(Header, [userProvider, accountsProvider, assetsProvider, symbolsProvider]);
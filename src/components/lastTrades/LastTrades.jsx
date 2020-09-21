import React from 'react';
import {Paper, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';

import {MODULES} from '../../constants/loadingModules';
import {showModuleLoader} from '../../helpers/loadingHelper';
import {withProviders} from '../../helpers/providersHelper';
import lastTradesProvider from '../../providers/lastTradesProvider';
import loaderProvider from '../../providers/loaderProvider';
import Loader from '../loader/Loader';

import './LastTrades.scss';

class LastTrades extends React.Component {
    render() {
        return (
            <Paper className='block-container last-trades'>
                <>
                    <div className='block-header'>
                        <Typography variant='h6'>
                            Last trades
                        </Typography>
                    </div>
                    {showModuleLoader(this.props.loadingModules, MODULES.LAST_TRADES)
                        ?
                        <Loader/>
                        :
                        <>
                            <TableContainer className='table-container'>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            <TableCell align='center'>Price</TableCell>
                                            <TableCell align='right'>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.lastTrades.map(order => (
                                            <TableRow key={order.id} className={order.side ? '_sell' : '_buy'}>
                                                <TableCell>
                                                    {order.time.split('T')[1]}
                                                    <br/>
                                                    {order.time.split('T')[0]}
                                                </TableCell>
                                                <TableCell align='center'>{order.price?.toFixed(2)}</TableCell>
                                                <TableCell align='right'>{order.volume?.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    }
                </>
            </Paper>
        );
    }
}

export default withProviders(LastTrades, [lastTradesProvider, loaderProvider]);
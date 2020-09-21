import React from 'react';
import {
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {animateScroll} from 'react-scroll';

import {MODULES} from '../../constants/loadingModules';
import {showModuleLoader} from '../../helpers/loadingHelper';
import {withProviders} from '../../helpers/providersHelper';
import orderBookProvider from '../../providers/orderBookProvider';
import loaderProvider from '../../providers/loaderProvider';
import Loader from '../loader/Loader';

import './OrderBook.scss';

const SELL_TABLE_ID = 'SELL_TABLE_ID';
const BUY_TABLE_ID = 'BUY_TABLE_ID';

class OrderBook extends React.Component {

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.orderBook) !== JSON.stringify(this.props.orderBook)) {
            animateScroll.scrollToBottom({containerId: SELL_TABLE_ID, duration: 0});
            animateScroll.scrollToTop({containerId: BUY_TABLE_ID, duration: 0});
        }
    }

    render() {
        return (
            <Paper className='block-container order-book'>
                <>
                    <div className='block-header'>
                        <Typography variant='h6'>
                            Order book
                        </Typography>
                    </div>
                    {showModuleLoader(this.props.loadingModules, MODULES.ORDER_BOOK)
                        ?
                        <Loader/>
                        :
                        <>
                            <TableContainer className='table-container' id={SELL_TABLE_ID}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='left'>Price</TableCell>
                                            <TableCell align='right'>Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.orderBook.sell.map(order => (
                                            <TableRow key={order.id} className='_sell'>
                                                <TableCell align='left'>{order.price}</TableCell>
                                                <TableCell align='right'>{order.volume}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Divider className='order-book__divider'/>
                            <TableContainer className='table-container' id={BUY_TABLE_ID}>
                                <Table>
                                    <TableBody>
                                        {this.props.orderBook.buy.map(order => (
                                            <TableRow key={order.id} className='_buy'>
                                                <TableCell align='left'>{order.price}</TableCell>
                                                <TableCell align='right'>{order.volume}</TableCell>
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

export default withProviders(OrderBook, [orderBookProvider, loaderProvider]);
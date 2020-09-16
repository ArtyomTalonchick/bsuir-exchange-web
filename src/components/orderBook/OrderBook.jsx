import React from 'react';
import {Paper, Typography} from '@material-ui/core';

import './OrderBook.scss';

class OrderBook extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className='main__block order-book'>
                <>
                    <div className='main__block-header'>
                        <Typography variant='h6'>
                            Order book
                        </Typography>
                    </div>
                </>
            </Paper>
        );
    }
}

export default (OrderBook);
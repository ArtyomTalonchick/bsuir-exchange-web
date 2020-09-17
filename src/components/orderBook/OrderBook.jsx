import React from 'react';
import {Paper, Typography} from '@material-ui/core';

import './OrderBook.scss';

class OrderBook extends React.Component {
    constructor(props) {
        super(props);
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
                </>
            </Paper>
        );
    }
}

export default (OrderBook);
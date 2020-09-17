import React from 'react';
import {Paper, Typography} from '@material-ui/core';

import './LastTrades.scss';

class LastTrades extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className='block-container last-trades'>
                <>
                    <div className='block-header'>
                        <Typography variant='h6'>
                            Last trades
                        </Typography>
                    </div>
                </>
            </Paper>
        );
    }
}

export default (LastTrades);
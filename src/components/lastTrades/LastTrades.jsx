import React from 'react';
import {IconButton, Paper, Typography} from '@material-ui/core';

import './LastTrades.scss';

class LastTrades extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className='main__block last-trades'>
                <>
                    <div className='main__block-header'>
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
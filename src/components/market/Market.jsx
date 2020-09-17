import React from 'react';
import {Paper, Tab, Tabs} from '@material-ui/core';

import './Market.scss';

class Market extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0
        };
    }

    onChangeMode = (e, mode) => this.setState({mode, username: '', password: '', password2: ''});

    render() {
        return (
            <>
                <Tabs
                    value={this.state.mode}
                    onChange={this.onChangeMode}
                    variant='fullWidth'
                    className='market-bar'
                >
                    <Tab label='Market' className='block-header'/>
                    <Tab label='Limit' className='block-header'/>
                </Tabs>
                <Paper className='main__block market'>
                </Paper>
            </>
        );
    }
}

export default (Market);
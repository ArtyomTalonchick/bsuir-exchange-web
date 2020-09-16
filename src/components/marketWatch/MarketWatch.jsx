import React from 'react';
import {Paper, Drawer} from '@material-ui/core';

import './MarketWatch.scss';

class MarketWatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onOpen = () => this.setState({open: true});
    onClose = () => this.setState({open: false});
    onToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <>
                <div className='market-watch__placeholder'>
                    <button className='market-watch__button' onClick={this.onToggle}>
                        Market watch
                    </button>
                </div>
                <Drawer anchor='left' open={this.state.open} onClose={this.onToggle}>
                    <>
                        <div className='market-watch__content'>
                        </div>
                        <div className='market-watch__placeholder _inner'>
                            <button className='market-watch__button _inner' onClick={this.onToggle}>
                                Market watch
                            </button>
                        </div>
                    </>
                </Drawer>
            </>
        );
    }
}

export default (MarketWatch);
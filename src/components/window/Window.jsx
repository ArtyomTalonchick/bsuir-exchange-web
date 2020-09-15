import React from 'react';
import {IconButton, Modal, Paper, Typography} from '@material-ui/core';
import './Window.scss';

export default class Window extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                // onClose={this.props.onClose}
            >
                <Paper className='window'>
                    <div className='window__header _df-aic-jcsb'>
                        <Typography variant='h6' className=''>
                            {this.props.title}
                        </Typography>
                        <IconButton onClick={this.props.onClose}>
                            <i className='fa fa-times'/>
                        </IconButton>
                    </div>
                    <div className='window__content'>
                        {this.props.children}
                    </div>
                </Paper>

            </Modal>
        );
    }
}
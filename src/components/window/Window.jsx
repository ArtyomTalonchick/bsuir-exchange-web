import React from 'react';
import {Button, IconButton, Modal, Paper, Typography} from '@material-ui/core';
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
                    <>
                        <div className='window__header _df-aic-jcsb'>
                            <Typography variant='h6' className=''>
                                {this.props.title}
                            </Typography>
                            <IconButton onClick={this.props.onClose}>
                                <i className='fa fa-times'/>
                            </IconButton>
                        </div>
                        <div>
                            {this.props.children}
                        </div>

                        {this.props.onCancel || this.props.onSubmit}
                        <div className='window__controls _df-aic-jcsa'>
                            {this.props.onCancel &&
                            <Button onClick={this.props.onCancel} className='primary'>
                                Cancel
                            </Button>
                            }
                            {this.props.onSubmit &&
                            <Button onClick={this.props.onSubmit} disabled={this.props.submitDisabled}
                                    className='primary'>
                                Submit
                            </Button>
                            }
                        </div>
                    </>
                </Paper>
            </Modal>
        );
    }
}
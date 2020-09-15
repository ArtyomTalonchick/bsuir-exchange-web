import React from 'react';
import {Tabs, Tab, TextField} from '@material-ui/core';

import Window from '../window/Window';

import './AuthWindow.scss';

export default class AuthWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
        };
    }

    onChangeMode = (e, mode) => this.setState({mode});

    onSubmit = () => {

    }

    render() {
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                onCancel={this.props.onClose}
                onSubmit={this.onSubmit}
                title='Authentication'
            >
                <div>
                    <Tabs
                        value={this.state.mode}
                        onChange={this.onChangeMode}
                        variant='fullWidth'
                        className='auth_bar'
                    >
                        <Tab label='Login'/>
                        <Tab label='Registration'/>
                    </Tabs>

                    <form noValidate autoComplete='off' className='auth_form'>
                        <TextField label='Username' variant='outlined'/>
                        <TextField label='Password' variant='outlined'/>

                        {this.state.mode === 1 &&
                        <TextField label='Confirm password' variant='outlined'/>
                        }
                    </form>
                </div>
            </Window>
        );
    }
}
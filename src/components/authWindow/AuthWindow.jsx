import React from 'react';
import {Tabs, Tab, TextField} from '@material-ui/core';

import Window from '../window/Window';
import withAlert from '../withAlert';
import withUser from '../withUser';
import withLoader from '../withLoader';
import userService from '../../services/userService';
import validateHelper from '../../helpers/validateHelper';

import './AuthWindow.scss';

class AuthWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            username: '',
            password: '',
            password2: '',
        };
    }

    onChangeMode = (e, mode) => this.setState({mode, username: '', password: '', password2: ''});

    onChangeField = e => this.setState({[e.currentTarget.name]: e.currentTarget.value})

    onSubmit = () => {
        const method = this.state.mode === 0 ? userService.login : userService.registration;
        this.props.startLoading();
        method(this.state.username, this.state.password)
            .then(response => {
                this.props.login(JSON.parse(response.data));
                this.props.onClose();
            })
            .catch(reason => {
                const status = reason.response.status;
                const error = status === 403 ? 'Email or password is wrong' : 'Server error, sorry, try again later';
                this.props.setError(error);
            })
            .finally(this.props.finishLoading);
    }

    render() {
        const submitDisabled = !(validateHelper.email(this.state.username) && validateHelper.password(this.state.password)
            && (this.state.mode === 0 || this.state.password === this.state.password2));
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                onCancel={this.props.onClose}
                onSubmit={this.onSubmit}
                submitDisabled={submitDisabled}
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

                    <div className='auth_form'>
                        <TextField
                            error={!validateHelper.email(this.state.username)}
                            label='Email'
                            variant='outlined'
                            name='username'
                            value={this.state.username}
                            onChange={this.onChangeField}
                        />
                        <TextField
                            error={!validateHelper.password(this.state.password)}
                            label='Password'
                            variant='outlined'
                            name='password'
                            type='password'
                            value={this.state.password}
                            onChange={this.onChangeField}
                        />

                        {this.state.mode === 1 &&
                        <TextField
                            error={!validateHelper.password(this.state.password2)}
                            label='Confirm password'
                            variant='outlined'
                            name='password2'
                            type='password'
                            value={this.state.password2}
                            onChange={this.onChangeField}
                        />
                        }
                    </div>
                </div>
            </Window>
        );
    }
}

export default withUser(withAlert(withLoader(AuthWindow)));
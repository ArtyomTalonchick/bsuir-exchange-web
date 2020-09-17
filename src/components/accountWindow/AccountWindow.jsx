import React from 'react';
import {TextField} from '@material-ui/core';

import Window from '../window/Window';
import withAlert from '../withAlert';
import withUser from '../withUser';
import withLoader from '../withLoader';
import validateHelper from '../../helpers/validateHelper';

import './AccountWindow.scss';

class AccountWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onChangeField = e => this.setState({[e.currentTarget.name]: e.currentTarget.value})

    onSubmit = () => {
        return;
        this.props.startLoading();
        (() => ({}))()
            .then(response => {

                this.props.onClose();
            })
            .catch(reason => {
                const status = reason.response.status;
                const error = status === 403 ? 'Access denied' : 'Server error, sorry, try again later';
                this.props.setError(error);
            })
            .finally(this.props.finishLoading);
    }

    render() {
        const submitDisabled = !(validateHelper.email('') && false);
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                onCancel={this.props.onClose}
                onSubmit={this.onSubmit}
                submitDisabled={submitDisabled}
                title='Create account'
            >
                <div>
                    <TextField
                        error={!validateHelper.password(this.state.name)}
                        label='Password'
                        variant='outlined'
                        name='name'
                        value={this.state.name}
                        onChange={this.onChangeField}
                    />
                </div>
            </Window>
        );
    }
}

export default withUser(withAlert(withLoader(AccountWindow)));
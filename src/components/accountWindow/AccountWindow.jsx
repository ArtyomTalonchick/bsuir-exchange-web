import React from 'react';
import {TextField} from '@material-ui/core';

import accountsServices from '../../services/accountsServices';
import validateHelper from '../../helpers/validateHelper';
import Window from '../window/Window';
import withAlert from '../withAlert';
import withUser from '../withUser';
import withLoader from '../withLoader';

class AccountWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accountName: ''
        };
    }

    onChangeField = e => this.setState({[e.currentTarget.name]: e.currentTarget.value})

    onSubmit = () => {
        this.props.startLoading();
        accountsServices.create(this.state.accountName)
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
        const submitDisabled = !validateHelper.accountName(this.state.accountName);
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                onCancel={this.props.onClose}
                onSubmit={this.onSubmit}
                submitDisabled={submitDisabled}
                title='Create account'
            >
                <div className='_padding'>
                    <TextField
                        error={!validateHelper.accountName(this.state.accountName)}
                        label='Name'
                        variant='outlined'
                        name='accountName'
                        value={this.state.accountName}
                        onChange={this.onChangeField}
                        fullWidth
                    />
                </div>
            </Window>
        );
    }
}

export default withUser(withAlert(withLoader(AccountWindow)));
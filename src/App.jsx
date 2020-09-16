import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import withAlert from './components/withAlert';
import Header from './components/header/Header';

import './App.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    autoHideDuration={3000}
                    open={this.props.error}
                    onClose={this.props.clearError}>
                    <Alert onClose={this.props.clearError} severity='error'>
                        {this.props.error}
                    </Alert>
                </Snackbar>
                <Header/>
                BSUIR Exchange
            </div>
        );
    }
}

export default withAlert(App);
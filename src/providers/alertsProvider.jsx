import React from 'react';
import {BehaviorSubject} from 'rxjs';

let message = null;

const message$ = new BehaviorSubject(message);

const setMessage = _message => {
    message = _message;
    message$.next(message);
}

export const setError = text => setMessage({type: 'error', text});

export const setSuccess = text => setMessage({type: 'success', text});

export const clearMessage = () => setMessage(null);

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {message};
        }

        componentDidMount() {
            this.subscription = message$.subscribe(message => this.setState({message}));
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    message={this.state.message}
                    setError={setError}
                    clearMessage={clearMessage}
                />
            );
        }
    };
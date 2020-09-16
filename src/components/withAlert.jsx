import React from 'react';
import {BehaviorSubject} from 'rxjs';

let error = null;

const error$ = new BehaviorSubject(error);

const setError = _error => {
    error = _error;
    error$.next(error);
};

const clearError = () => setError(null);

export default function (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {error};
        }

        componentDidMount() {
            this.subscription = error$.subscribe(error => this.setState({error}));
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    error={this.state.error}
                    setError={setError}
                    clearError={clearError}
                />
            );
        }
    };
}
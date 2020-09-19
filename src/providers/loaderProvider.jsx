import React from 'react';
import {BehaviorSubject} from 'rxjs';

let loader = false;

const loader$ = new BehaviorSubject(loader);

const setLoading = _loader => {
    loader = _loader;
    loader$.next(loader);
};

export const startLoading = () => setLoading(true);
export const finishLoading = () => setLoading(false);

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {loader};
        }

        componentDidMount() {
            this.subscription = loader$.subscribe(loader => this.setState({loader}));
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    loading={this.state.loader}
                    startLoading={startLoading}
                    finishLoading={finishLoading}
                />
            );
        }
    };
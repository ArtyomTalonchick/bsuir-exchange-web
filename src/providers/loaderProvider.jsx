import React from 'react';
import {BehaviorSubject} from 'rxjs';

let loader = {};

const loader$ = new BehaviorSubject(loader);

const setLoading = (moduleName, state) => {
    loader = {...loader, [moduleName]: state};
    loader$.next(loader);
};

export const startLoading = moduleName => setLoading(moduleName, true);
export const finishLoading = moduleName => setLoading(moduleName, false);

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
                    loadingModules={this.state.loader}
                    startLoading={startLoading}
                    finishLoading={finishLoading}
                />
            );
        }
    };
import React from 'react';
import {BehaviorSubject} from 'rxjs';

let assets = [];

const assets$ = new BehaviorSubject(assets);

export const setAssets = _assets => {
    assets = _assets;
    assets$.next(_assets);
};

export default function (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {assets};
        }

        componentDidMount() {
            this.subscription = assets$.subscribe(assets =>
                this.setState({assets})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    assets={this.state.assets}
                />
            );
        }
    };
}
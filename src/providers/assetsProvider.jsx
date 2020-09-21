import React from 'react';
import {BehaviorSubject} from 'rxjs';

import {MODULES} from '../constants/loadingModules';
import {onAccountChangeSubscribe} from './accountsProvider';
import {startLoading} from './loaderProvider';

let assets = [];

const assets$ = new BehaviorSubject(assets);

export const setAssets = _assets => {
    assets = _assets;
    assets$.next(_assets);
};

export const getAssetByCurrencyId = currencyId => assets.find(asset => asset.currency_id === currencyId);

setTimeout(() => {
    // startLoading(MODULES.ASSETS);
    onAccountChangeSubscribe(() => {
        // startLoading(MODULES.ASSETS);
        setAssets([]);
    });
});

export default WrappedComponent =>
    class extends React.Component {
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
                    getAssetByCurrencyId={getAssetByCurrencyId}
                />
            );
        }
    };
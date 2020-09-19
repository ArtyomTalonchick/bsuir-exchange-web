import React from 'react';
import {BehaviorSubject} from 'rxjs';
import assetsService from "../services/assetsService";

let accounts = [];
try {
    accounts = JSON.parse(localStorage.getItem('User')).accounts || [];
} catch {
}

const accounts$ = new BehaviorSubject(accounts);

setTimeout(() => accounts.length && assetsService.update());

export const setAccounts = _accounts => {
    accounts = _accounts;
    accounts$.next(_accounts);
    return assetsService.update();
};

export const setCurrentAccount = id => {
    const index = accounts.findIndex(acc => acc.id === id);
    if (index === -1) return;

    const _accounts = [...accounts];
    const [currentAccount] = _accounts.splice(index, 1);
    _accounts.unshift(currentAccount);
    setAccounts(_accounts);
}

export const getCurrentAccount = () => accounts.length ? accounts[0] : null;

export default function (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {accounts};
        }

        componentDidMount() {
            this.subscription = accounts$.subscribe(accounts =>
                this.setState({accounts})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    accounts={this.state.accounts}
                    setCurrentAccount={setCurrentAccount}
                    getCurrentAccount={getCurrentAccount}
                />
            );
        }
    };
}
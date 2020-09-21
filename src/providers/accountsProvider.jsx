import React from 'react';
import {BehaviorSubject} from 'rxjs';

let accounts = [];
try {
    accounts = JSON.parse(localStorage.getItem('User')).accounts || [];
} catch {
}

const accounts$ = new BehaviorSubject(accounts);

export const onAccountChangeSubscribe = handler => accounts$.subscribe(handler);

export const setAccounts = _accounts => {
    accounts = _accounts;
    accounts$.next(_accounts);
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

export default WrappedComponent =>
    class extends React.Component {
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
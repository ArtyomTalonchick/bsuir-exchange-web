import React from 'react';
import {BehaviorSubject} from 'rxjs';
import {setAccounts} from './accountsProvider';

let user = null;
try {
    user = JSON.parse(localStorage.getItem('User'));
} catch {
}

const user$ = new BehaviorSubject(user);

export const setUser = _user => {
    user = _user;
    localStorage.setItem('User', JSON.stringify(user));
    localStorage.setItem('Authorization', user && user.token);
    user?.accounts && setAccounts(user.accounts);
    user$.next(user);
};

export default WrappedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {user};
        }

        componentDidMount() {
            this.subscription = user$.subscribe(newUser =>
                this.setState({user: newUser})
            );
        }

        componentWillUnmount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    user={this.state.user}
                />
            );
        }
    };
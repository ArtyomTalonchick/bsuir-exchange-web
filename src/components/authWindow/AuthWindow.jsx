import React from 'react';

import Window from '../window/Window';

export default class AuthWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Window
                open={this.props.open}
                onClose={this.props.onClose}
                title='Authentication'
            >
                Body
            </Window>
        );
    }
}
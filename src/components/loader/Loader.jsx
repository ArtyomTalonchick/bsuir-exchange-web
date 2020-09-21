import React from 'react';
import {CircularProgress} from '@material-ui/core';

import './Loader.scss';

class Loader extends React.Component {
    render() {
        return (
            <div className='loader-container'>
                <CircularProgress color='inherit'/>
            </div>
        );
    }
}

export default Loader;
import React from 'react';
import {Paper, Typography} from '@material-ui/core';
import MaterialTable from 'material-table';

import {MODULES} from '../../constants/loadingModules';
import historyService from '../../services/historyService';
import {showModuleLoader} from '../../helpers/loadingHelper';
import {withProviders} from '../../helpers/providersHelper';
import loaderProvider from '../../providers/loaderProvider';
import historyProvider from '../../providers/historyProvider';
import Loader from '../loader/Loader';

import './History.scss';

class History extends React.Component {

    onRemove = (e, dataItem) => {
        historyService.removeLimitOrder(dataItem.id);
    }

    render() {
        return (
            <Paper className='block-container history'>
                <>
                    <div className='block-header'>
                        <Typography variant='h6'>
                            History
                        </Typography>
                    </div>
                    {showModuleLoader(this.props.loadingModules, MODULES.HISTORY)
                        ?
                        <Loader/>
                        :
                        <>
                            <MaterialTable
                                columns={[
                                    {
                                        title: 'Time', field: 'time',
                                        render: s => `${s.time.split('T')[1]} ${s.time.split('T')[0]}`
                                    },
                                    {title: 'Price', field: 'price'},
                                    {title: 'Amount', field: 'volume'},

                                ]}
                                data={this.props.history}
                                title='Opened Limits'
                                onRowClick={this.onSymbolClick}
                                options={{
                                    emptyRowsWhenPaging: false,
                                    rowStyle: rowData =>
                                        ({color: rowData.side ? '#BF360C' : '#1B5E20'})
                                }}
                                actions={[
                                    {
                                        icon: 'delete',
                                        tooltip: 'Remove',
                                        onClick: this.onRemove
                                    }
                                ]}
                            />
                        </>
                    }

                </>
            </Paper>
        );
    }
}

export default withProviders(History, [loaderProvider, historyProvider]);
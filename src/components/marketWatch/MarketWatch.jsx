import React from 'react';
import {Drawer} from '@material-ui/core';
import MaterialTable from 'material-table'

import {withProviders} from '../../helpers/providersHelper';
import symbolsProvider from '../../providers/symbolsProvider';

import './MarketWatch.scss';

class MarketWatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onToggle = () => this.setState({open: !this.state.open});

    onSymbolClick = (e, symbol) => {
        this.props.setCurrentSymbol(symbol.id);
        this.onToggle();
    }

    render() {
        const currentSymbol = this.props.getCurrentSymbol();
        return (
            <>
                <div className='market-watch__placeholder'>
                    <button className='market-watch__button' onClick={this.onToggle}>
                        Market watch
                    </button>
                </div>
                <Drawer anchor='left' open={this.state.open} onClose={this.onToggle}>
                    <>
                        <div className='market-watch__content'>
                            <MaterialTable
                                columns={[
                                    {title: 'Symbol Name', field: 'name'},
                                    {title: 'Currencies', render: s => `${s.currency1.full_name} - ${s.currency2.full_name}`},

                                ]}
                                data={this.props.symbols}
                                title=''
                                onRowClick={this.onSymbolClick}
                                options={{
                                    emptyRowsWhenPaging: false,
                                    minBodyHeight: '100%',
                                    rowStyle: rowData =>
                                        rowData.id === currentSymbol.id ? {backgroundColor: '#f9aa33'} : {}
                                }}
                            />
                        </div>
                        <div className='market-watch__placeholder _inner'>
                            <button className='market-watch__button _inner' onClick={this.onToggle}>
                                Market watch
                            </button>
                        </div>
                    </>
                </Drawer>
            </>
        );
    }
}

export default withProviders(MarketWatch, [symbolsProvider]);
const apiUrl = 'https://bsuir-exchange-api.herokuapp.com/';
// const apiUrl = 'http://127.0.0.1:8000/';

export const endpoints = {
    user: {
        login: `${apiUrl}users/login`,
        registration: `${apiUrl}users/registration`,
    },

    currencies: `${apiUrl}currencies`,

    assets: {
        get: account_id => `${apiUrl}assets/${account_id}`,
        create: `${apiUrl}assets`,
    },

    accounts: {
        create: `${apiUrl}accounts`,
    },

    symbols: `${apiUrl}symbols`,

    orders: {
        book: `${apiUrl}orders/book`,
        trades: `${apiUrl}orders/trades`,
        stats: `${apiUrl}orders/stats`,
        create: `${apiUrl}orders`,
    }

};
const axios = require('axios');

const BINANCE_HOST = 'https://api.binance.com';
const STREAM_BINANCE_HOST = 'wss://stream.binance.com:9443/ws';
const ORDER_BOOK = '/api/v3/depth';

export const SDK = {
    get: async (symbol, limit) => {
        const depth = await axios.get(`${BINANCE_HOST}${ORDER_BOOK}?symbol=${symbol.toUpperCase()}&limit=${limit}`)
        return depth.data;
    },
    subscribe: function (symbol) {
        return new WebSocket(`${STREAM_BINANCE_HOST}/${symbol.toLowerCase()}@depth`)
    }
};
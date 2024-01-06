import { ICryptoData, ICryptoHistoryData } from '../utils/interface/crytposInterface';

import mongoose from 'mongoose';
const cryptocurrencySchema = new mongoose.Schema<ICryptoData>({
    id: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    supply: {
        type: String,
        required: true
    },
    maxSupply: {
        type: String,
        required: false // Because some cryptocurrencies might not have a max supply
    },
    marketCapUsd: {
        type: String,
        required: true
    },
    volumeUsd24Hr: {
        type: String,
        required: true
    },
    priceUsd: {
        type: String,
        required: true
    },
    changePercent24Hr: {
        type: String,
        required: true
    },
    vwap24Hr: {
        type: String,
        required: false
    },
    explorer: {
        type: String,
        required: false
    },
    visibility: {
        type: Boolean,
        require: false
    }
});



// Schema for Crypto History
const CryptocurrencyHistoriesSchema = new mongoose.Schema({
    cryptocurrency: {
        type: String,
        ref: 'Cryptocurrency',
        required: true
    },
    priceUsd: {
        type: String,
        require: true
    },
    time: {
        type: Number,
        require: true,
        unique: true
    },

});
const Cryptocurrency = mongoose.model<ICryptoData>('Cryptocurrency', cryptocurrencySchema);
const CryptoHistory = mongoose.model<ICryptoHistoryData>('CryptoHistory', CryptocurrencyHistoriesSchema);


export { Cryptocurrency, CryptoHistory }

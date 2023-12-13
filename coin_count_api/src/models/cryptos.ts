
import { ICryptoData, ICryptoHistoryData } from '@/utils/interface/crytposInterface';

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
    }
}, { timestamps: true });



 // Schema for Crypto History
const CryptoHistorySchema = new mongoose.Schema<ICryptoHistoryData>({
    cryptocurrency: {
        type: String,
        required: true,
        ref: 'Cryptocurrency' // Reference to the Cryptocurrency model
    },
    priceUsd: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
}, { timestamps: true });
 const Cryptocurrency = mongoose.model<ICryptoData>('Cryptocurrency', cryptocurrencySchema);
 const CryptoHistory = mongoose.model<ICryptoHistoryData>('CryptoHistory', CryptoHistorySchema);


export  { Cryptocurrency, CryptoHistory}

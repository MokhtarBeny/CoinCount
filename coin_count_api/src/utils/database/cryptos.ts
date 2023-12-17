import {CryptoHistory, Cryptocurrency }from '@/models/cryptos'
import { ICryptoData, ICryptoHistoryData } from '@/utils/interface/crytposInterface';



export const addCryptoDataList = async (cryptoDataList: ICryptoData[]): Promise<void> => {
    for (const data of cryptoDataList) {
        await Cryptocurrency.updateOne({ id: data.id }, data, { upsert: true });
    }
};


export const addCryptoHistory = async (cryptoHistories: ICryptoHistoryData[], cryptoId: string): Promise<void> => {
    try {
        const historyData = cryptoHistories.map(record => ({
            priceUsd: Number(record.priceUsd), // Ensure priceUsd is a number
            time: record.time
        }));

        await CryptoHistory.updateOne(
            { cryptocurrency: cryptoId },
            { $push: { histories: { $each: historyData } } }, // Use $push with $each for multiple items
            { upsert: true }
        );

        console.log(`Successfully added ${historyData.length} asset history records.`);
    } catch (error) {
        console.error('Error adding asset history to the database:', error);
        throw error;
    }
};

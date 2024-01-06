import { CryptoHistory, Cryptocurrency } from '../../models/cryptos'
import { ICryptoData, ICryptoHistoryData } from '../../utils/interface/crytposInterface';
import logger from '../logger';


let isInitialRun = true;

export const addCryptoDataList = async (cryptoDataList: ICryptoData[]): Promise<void> => {
    for (const data of cryptoDataList) {
        await Cryptocurrency.updateOne({ id: data.id }, data, { upsert: true });
    }
};




export const addCryptoHistory = async (assetHistories: ICryptoHistoryData[], crypto_id: string): Promise<void> => {

    try {
        // If it's the initial run, drop the collection
        if (isInitialRun) {
            await CryptoHistory.collection.drop();
            logger.info('CryptoHistory collection dropped for initialization');
            isInitialRun = false; // Reset the flag after initial run
        } else {
            // Check the collection size only on subsequent runs
            const collectionCount = await CryptoHistory.countDocuments();
            if (collectionCount >= 500000) {
                await CryptoHistory.collection.drop();
                logger.info('CryptoHistory collection dropped due to size limit');
            }
        }

        // Add the cryptocurrency ID to each history record
        const historiesWithCryptoId = assetHistories.map(history => ({
            ...history,
            cryptocurrency: crypto_id
        }));

        // Insert the modified records into the database
        await CryptoHistory.insertMany(historiesWithCryptoId);
        logger.info(`Successfully added ${historiesWithCryptoId.length} asset history records.`);
    } catch (error) {
        // Log the error and rethrow it for further handling
        logger.error('Error in addCryptoHistory function:', error);
        throw error;
    }
};


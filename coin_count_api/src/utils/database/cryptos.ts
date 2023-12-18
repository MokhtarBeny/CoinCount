import Cryptocurrency from '../../models/cryptos'
import { ICryptoData } from '../interface/crytposInterface';



export const addCryptoDataList = async (cryptoDataList: ICryptoData[]): Promise<void> => {
    for (const data of cryptoDataList) {
        await Cryptocurrency.updateOne({ id: data.id }, data, { upsert: true });
    }
};

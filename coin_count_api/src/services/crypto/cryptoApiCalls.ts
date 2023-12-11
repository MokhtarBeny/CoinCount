import axios from "axios";
import { ICryptoData } from "../../utils/interface/crytposInterface";
import { addCryptoDataList } from "../../utils/database/cryptos";
import cron from 'node-cron';
import logger from "../../utils/logger";

class CryptoApiCalls {

     private axiosCoinCapInstance = axios.create({
          baseURL: process.env.API_URL,
          timeout: 10000,
          headers: {
               'Content-Type': 'application/json',
               Authorization: process.env.API_KEY
          },
     });

     // Function to fetch crypto data from the API
     public async fetchCryptoData(): Promise<ICryptoData[]> {
          try {
               const response = await this.axiosCoinCapInstance.get('/assets');
               return response.data.data as ICryptoData[];
          } catch (error) {
               console.error('Error fetching cryptocurrency data:', error);
               return [];
          }
     }



     // Initialize and fetch data immediately, then set up the hourly schedule
     public async initializeCryptoDataFetch(): Promise<void> {
          logger.info('Initializing cryptocurrency data...');

          // Fetch and store data immediately on startup
          const initialData = await this.fetchCryptoData();
          if (initialData.length > 0) {
               await addCryptoDataList(initialData);
               logger.info('Initial cryptocurrency data fetched and stored.');
          }

          // Set up the hourly scheduled task
          cron.schedule('* */1 * * *', async () => {
               logger.info('Fetching and updating cryptocurrency data...');
               const cryptoDataList = await this.fetchCryptoData();
               if (cryptoDataList.length > 0) {
                    await addCryptoDataList(cryptoDataList);
                    logger.info('Cryptocurrency data updated successfully');
               }
          });
     }
}

export default CryptoApiCalls;
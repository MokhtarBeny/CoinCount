import logger from "@/utils/logger";
import CryptoApiCalls from "./cryptoApiCalls";

export const cryptoDataFetch = async () => {
     // Create an instance of the CryptoApiCalls class
     const cryptoApi = new CryptoApiCalls();
     // Initialize the scheduled fetching of crypto data
     try {
          await cryptoApi.initializeCryptoDataFetch();
          logger.info('Crypto data fetch initialized.');
     } catch (error) {
          logger.error('Error initializing crypto data fetch:', error);
     }
}

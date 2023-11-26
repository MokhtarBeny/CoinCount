import { Request, Response } from 'express';
import Cryptocurrency from '../models/cryptos'
import { ICryptoData } from '@/utils/interface/crytposInterface';
import axios from 'axios';
import cron from 'node-cron';
import { addCryptoDataList } from '@/utils/database/cryptos';


// Function to fetch crypto data from the API
export const fetchCryptoData = async (): Promise<ICryptoData[]> => {
  try {
      const response = await axios.get('https://api.coincap.io/v2/assets'); // Replace with your actual API URL
      return response.data.data as ICryptoData[];
  } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      return [];
  }
};


// Initialize and fetch data immediately, then set up the hourly schedule
export const initializeCryptoDataFetch = async (): Promise<void> => {
    console.log('Initializing cryptocurrency data...');

    // Fetch and store data immediately on startup
    const initialData = await fetchCryptoData();
    if (initialData.length > 0) {
        await addCryptoDataList(initialData);
        console.log('Initial cryptocurrency data fetched and stored.');
    }

    // Set up the hourly scheduled task
    cron.schedule('* */1 * * *', async () => {
        console.log('Fetching and updating cryptocurrency data...');
        const cryptoDataList = await fetchCryptoData();
        console.log(cryptoDataList.length)
        if (cryptoDataList.length > 0) {
            await addCryptoDataList(cryptoDataList);
            console.log('Cryptocurrency data updated successfully');
        }
    });
};

// Gett Crypto Data
export const getCryptosList = async (req: Request, res: Response): Promise<void> => {
    try {
        const cryptos = await Cryptocurrency.find(); // Retrieves all cryptocurrency entries
        res.status(200).json(cryptos);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cryptocurrency data", error: error });
    }
};

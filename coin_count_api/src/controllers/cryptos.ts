import { Request, Response } from 'express';
import Cryptocurrency from '../models/cryptos'


// Gett Crypto Data
export const getCryptosList = async (req: Request, res: Response): Promise<void> => {
    try {
        const cryptos = await Cryptocurrency.find(); // Retrieves all cryptocurrency entries
        res.status(200).json(cryptos);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cryptocurrency data", error: error });
    }
};

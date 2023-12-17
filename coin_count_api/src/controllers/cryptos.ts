import { Request, Response } from 'express';
import {Cryptocurrency} from '../models/cryptos'


// Get Crypto Data
export const getCryptosList = async (req: Request, res: Response): Promise<void> => {
    try {
        const cryptos = await Cryptocurrency.find(); // Retrieves all cryptocurrency entries
        res.status(200).json(cryptos);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cryptocurrency data", error: error });
    }
};

// Get cryptobyID
export const getCryptoById = async (req: Request, res: Response): Promise<void> => {
    const crypto_id = req.params.crypto_id;
    try {

        const crypto = await Cryptocurrency.findOne({ id: crypto_id })
        res.status(200).json(crypto);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cryptocurrency" })
    }
}

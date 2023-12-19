import axios from "axios";
import {
	ICryptoData,
	ICryptoHistoryData,
} from "../../utils/interface/crytposInterface";
import {
	addCryptoDataList,
	addCryptoHistory,
} from "../../utils/database/cryptos";
import cron from "node-cron";
import logger from "../../utils/logger";

class CryptoApiCalls {
	private axiosCoinCapInstance = axios.create({
		baseURL: process.env.API_URL,
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
			Authorization: process.env.API_KEY,
		},
	});

	// Function to fetch crypto data from the API
	public async fetchCryptoData(): Promise<ICryptoData[]> {
		try {
			const response = await this.axiosCoinCapInstance.get("/assets");
			return response.data.data as ICryptoData[];
		} catch (error) {
			logger.error("Error fetching cryptocurrency data:", error);
			return [];
		}
	}

	// Function to fetch asset history data for a given cryptocurrency
	public async fetchCryptoHistory(
		cryptoId: string,
		interval: string
	): Promise<ICryptoHistoryData[]> {
		try {
			const response = await this.axiosCoinCapInstance.get(
				`/assets/${cryptoId}/history?interval=${interval}`
			);
			return response.data.data as ICryptoHistoryData[];
		} catch (error) {
			logger.error(
				`Error fetching ${interval} asset history for ${cryptoId}:`,
				error
			);
			return [];
		}
	}

	// Initialize and fetch data immediately, then set up the hourly schedule
	public async initializeCryptoDataFetch(): Promise<void> {
		logger.info("Initializing cryptocurrency data...");

		// Fetch and store data immediately on startup
		const initialData = await this.fetchCryptoData();
		if (initialData.length > 0) {
			await addCryptoDataList(initialData);
			logger.info("Initial cryptocurrency data fetched and stored.");
		}

		// Fetch and store asset history for each cryptocurrency
		for (const crypto of initialData) {
			const CryptoHistory = await this.fetchCryptoHistory(crypto.id, "h1");
			if (CryptoHistory.length > 0) {
				await addCryptoHistory(CryptoHistory, crypto.id);
				logger.info(`Asset history for ${crypto.name} fetched and stored.`);
			}
		}


		cron.schedule("* * 1 * *", async () => {
			logger.info("Fetching and updating cryptocurrency data...");

			try {
				const cryptoDataList = await this.fetchCryptoData();

				let currentDate = Date.now();
				let oneHourBefore = Date.now() - 3600 * 1000;
				// let oneMinuteBefore = Date.now() - 60 * 1000;
				// let oneDayBefore = Date.now() - 24 * 60 * 60 * 1000;

				if (cryptoDataList.length > 0) {
					await addCryptoDataList(cryptoDataList);
					logger.info("Cryptocurrency data updated successfully");

					for (const crypto of cryptoDataList) {
						try {
							const hourCryptoHistory = await this.fetchCryptoHistory(
								crypto.id,
								`h1&start=${oneHourBefore}&end=${currentDate}`
							);
							if (hourCryptoHistory.length > 0) {
								await addCryptoHistory(hourCryptoHistory, crypto.id);
								logger.info(
									`Minute-level cryptocurrency history for ${crypto.name} updated successfully.`
								);
							}
						} catch (error) {
							logger.error(
								`Error updating minute-level cryptocurrency history for ${crypto.name}: ${error}`
							);
						}
					}
				}
			} catch (error) {
				logger.error(`Error fetching cryptocurrency data: ${error}`);
			}
		});
	}
}

export default CryptoApiCalls;

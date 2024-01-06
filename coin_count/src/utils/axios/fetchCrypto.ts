import getAxiosInstance from "./getAxiosInstance"; // Update with the correct path

// A function to fetch a single cryptocurrency data
export async function fetchCrypto(id: string) {
	const axiosInstance = getAxiosInstance();
	try {
		const response = await axiosInstance.get(`/cryptos/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching crypto data:", error);
		throw error;
	}
}
// A function to fetch a single cryptocurrency data
export async function fetchCryptoHistory(id: string) {
	const axiosInstance = getAxiosInstance();
	try {
		const response = await axiosInstance.get(`/cryptos/${id}/history`);
		return response.data;
	} catch (error) {
		console.error("Error fetching crypto data:", error);
		throw error;
	}
}

// A function to fetch a list of popular cryptocurrencies
export async function fetchCryptos() {
	const axiosInstance = getAxiosInstance();
	try {
		const response = await axiosInstance.get("/cryptos");
		return response.data;
	} catch (error) {
		console.error("Error fetching  cryptos:", error);
		throw error;
	}
}

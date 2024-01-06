import getAxiosInstance from "./getAxiosInstance";

export async function changeCryptoVisibility(cryptoId: string) {
	const axiosInstance = getAxiosInstance();
	try {
		const response = await axiosInstance.post(`/update-crypto/?id=${cryptoId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching crypto data:", error);
		throw error;
	}
}

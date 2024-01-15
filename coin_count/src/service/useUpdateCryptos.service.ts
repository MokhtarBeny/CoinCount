import { useState, useCallback, useRef } from "react";

import { fetchWrapper } from "../utils/fetchWrapper"

const useUpdateCryptoVisibility = <T>(): {
	data: T | null;
	error: any;
	isLoading: boolean;
	fetchData: (id: string) => Promise<void>;
} => {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchData = useCallback(async (id: string) => {
		const endpoint = `http://localhost:5036/api/update-crypto/?id=${id}`;

		const token = localStorage.getItem("t");
		setIsLoading(true);
		setError(null);
		setData(null);

		try {
			const config = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				// body: JSON.stringify({ 'cryptoId': id })
			};
			const result = await fetchWrapper<T>(endpoint, config);
			setData(result);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { data, error, isLoading, fetchData };
};
export default useUpdateCryptoVisibility;

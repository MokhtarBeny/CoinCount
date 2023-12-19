import axios from 'axios';

const getAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:5036/api",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (typeof window !== "undefined") {
        // Client-side only code
        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('t');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    return axiosInstance;
};

export default getAxiosInstance;

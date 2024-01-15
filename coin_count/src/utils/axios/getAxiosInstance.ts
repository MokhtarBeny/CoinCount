import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL  ||'http://localhost:5036'


const getAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: `${baseURL}/api`,
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

import axios from 'axios';


// get data base usrl from env file

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL


const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('t') || undefined
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use((response) => {
    // Handle responses
    return response;
}, (error) => {
    // Handle errors
    return Promise.reject(error);
});

export default axiosInstance;

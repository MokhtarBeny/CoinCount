import axios, { AxiosInstance } from 'axios';
import { NextRouter } from 'next/router';

const checkAdminRole = async (axiosInstance: AxiosInstance, router: NextRouter): Promise<boolean> => {
    try {
        const response = await axiosInstance.get("/check-admin");

        if (!response.data.isAdmin) {
            router.push("/unauthorized");
            return false;
        }

        return true;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            router.push("/login");
        } else {
            console.error("Error:", error);
            router.push("/unauthorized");
        }
        return false;
    }
};

export default checkAdminRole;

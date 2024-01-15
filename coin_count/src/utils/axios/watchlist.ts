import { toast } from "react-toastify";
import axiosInstance from "./axiosConfig";


   export const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get("/auth/watchlist");
   return response.data
    } catch (error) {
      throw error;
    }
  };

  export   const removeFromWatchlist = async (coin: any) => {
    try {
      const response = await axiosInstance.delete(
        "/auth/watchlist/" + coin._id,
        coin._id
      );
      if (response.status === 200) {
       return response.data.user.watchlist;
        
      }
    } catch (error) {
      toast.error("Erreur lors du retrait de la watchlist");
    }
  }

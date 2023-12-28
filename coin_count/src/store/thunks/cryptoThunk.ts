import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCrypto, fetchCryptoHistory, fetchCryptos } from '../../utils/axios/fetchCrypto'; // Update the path

export const fetchCryptoData = createAsyncThunk(
     'crypto/fetchCryptoData',
     async (_, thunkAPI) => {
          try {
               const response = await fetchCryptos();
               return response;
          } catch (error: any) {
               return thunkAPI.rejectWithValue(error.response.data);
          }
     }
);
export const fetchSingleCryptoData = createAsyncThunk(
     'crypto/fetchSingleCryptoData',
     async (id: string, thunkAPI) => {
          try {
               const response = await fetchCrypto(id); // Fetch a single crypto by ID
               return response;
          } catch (error: any) {
               return thunkAPI.rejectWithValue(error.response.data);
          }
     }
);
export const fetchCryptoDataHistory = createAsyncThunk(
     'crypto/fetchCryptoDataHistory',
     async (id: string, thunkAPI) => {
          try {
               const response = await fetchCryptoHistory(id); // Fetch a single crypto by ID
               return response;
          } catch (error: any) {
               return thunkAPI.rejectWithValue(error.response.data);
          }
     }
);
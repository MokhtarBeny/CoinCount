import { Action, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchCryptoData, fetchCryptoDataHistory, fetchSingleCryptoData, updateCryptoVisibility } from '../thunks/cryptoThunk';
import { ICryptoData, ICryptoHistoryData } from '@/utils/interface/cryptosInterface';

export interface CryptoState {
     crypto: ICryptoData | null;
     singleCrypto: ICryptoData | null; // Added for single crypto data
     cryptoHistory: ICryptoHistoryData | null;
     loading: boolean;
     error: any;
}

interface HydrateActionPayload {
     crypto: ICryptoData;
}

const initialState: CryptoState = {
     crypto: null,
     singleCrypto: null, // Initial state for single crypto
     cryptoHistory: null,
     loading: false,
     error: null,
};

export const cryptoSlice = createSlice({
     name: 'crypto',
     initialState,
     reducers: {
          // Add any synchronous reducers here if needed
     },
     extraReducers: (builder) => {
          builder
               .addCase(fetchCryptoData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchCryptoData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.crypto = action.payload;
               })
               .addCase(fetchCryptoData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               })
               .addCase(fetchSingleCryptoData.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchSingleCryptoData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.singleCrypto = action.payload;
               })
               .addCase(fetchSingleCryptoData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               })
               .addCase(fetchCryptoDataHistory.pending, (state) => {
                    state.loading = true;
                    state.error = null;
               })
               .addCase(fetchCryptoDataHistory.fulfilled, (state, action) => {
                    state.loading = false;
                    state.cryptoHistory = action.payload;
               })
               .addCase(fetchCryptoDataHistory.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
               })
               .addCase(updateCryptoVisibility.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updateCryptoVisibility.fulfilled, (state, action) => {
                    state.loading = false;
                    // No need to update anything else if you're not changing the state based on the response
                })
                .addCase(updateCryptoVisibility.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'An error occurred';
                })
               .addCase(HYDRATE, (state, action: Action & { payload: HydrateActionPayload }) => {
                    const nextState = {
                         ...state,
                         ...action.payload.crypto,
                    };
                    return nextState;
               });
     },
});

// Export actions and selectors
export const selectCrypto = (state: any) => state.crypto;
export const selectSingleCrypto = (state: any) => state.crypto.singleCrypto;
export const selectCryptoHistory = (state: any) => state.crypto.cryptoHistory

export default cryptoSlice.reducer;

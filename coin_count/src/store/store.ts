import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { counterSlice } from '@/store/slices/counterSlice';
import { authSlice } from '@/store/slices/authSlice';
import { cryptoSlice } from '@/store/slices/cryptoSlice';

const makeStore = () => configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
    crypto: cryptoSlice.reducer,
  },
  devTools: true,
});

// The store instance type
export type AppStore = ReturnType<typeof makeStore>;

// The state type
export type AppState = ReturnType<AppStore['getState']>;

// The dispatch type
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);

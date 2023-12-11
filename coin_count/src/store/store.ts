import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "@/store/slices/counterSlice";
import { authSlice } from "@/store/slices/authSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterSlice.reducer,
      auth: authSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);

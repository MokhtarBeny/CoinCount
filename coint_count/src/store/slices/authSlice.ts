import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface User {
    username: string,
    email: string,
    watchlists: any[]
    id: string
}

export interface AuthState {
    token: string;
    user: User;
}

const initialState: AuthState = {
    token: "",
    user: {
        id: "",
        username: "",
        email: "",
        watchlists: []
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        login: (state, action: PayloadAction<{ token: string, user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = "";
            state.user = { id: "", username: "", email: "", watchlists: [] };
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

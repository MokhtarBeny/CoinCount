import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
interface IArticleSource {
    title: string,
    url: string,
}
export interface ArticleSource {
    articles: IArticleSource[]
}
const initialState: ArticleSource = {
    articles: []
};
export const articleSlice = createSlice({
    name: "articleSource",
    initialState,
    reducers: {
        loadArticleSources: (state, action: PayloadAction<ArticleSource>) => {
            state.articles = action.payload.articles;
        },

        cleanArticleSources: (state) => {
            state.articles = [];
        },

        updateArticleSources: (state, action: PayloadAction<ArticleSource>) => {
            state.articles = action.payload.articles;
        }
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

export const { loadArticleSources, cleanArticleSources, updateArticleSources } = articleSlice.actions;

export default articleSlice.reducer;

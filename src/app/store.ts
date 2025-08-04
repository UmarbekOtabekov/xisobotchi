import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authSlice";
import { booksApi } from "../services/booksApi";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [booksApi.reducerPath]: booksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
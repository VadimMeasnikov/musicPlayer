import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { tracksApi } from "./queryApi/tracksJamendo";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        [tracksApi.reducerPath]:tracksApi.reducer,
        user: userReducer
    },
    middleware:(getDefault) => getDefault().concat(tracksApi.middleware)
})
setupListeners(store.dispatch)
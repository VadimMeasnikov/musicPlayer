import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { tracksApi } from "./queryApi/tracksJamendo";
export const store = configureStore({
    reducer: {
        [tracksApi.reducerPath]:tracksApi.reducer,
    },
    middleware:(getDefault) => getDefault().concat(tracksApi.middleware)
})
setupListeners(store.dispatch)
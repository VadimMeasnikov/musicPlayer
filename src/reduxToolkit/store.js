import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { tracksApi } from "./queryApi/tracksJamendo";
import { featuredTracksApi } from "./queryApi/getFeaturedTracks";
import userReducer from './slices/userSlice'


export const store = configureStore({
    reducer: {
        [tracksApi.reducerPath]:tracksApi.reducer,
        [featuredTracksApi.reducerPath]:tracksApi.reducer,
        user: userReducer
    },
    middleware:(getDefault) => getDefault().concat(tracksApi.middleware, featuredTracksApi.middleware)
})
setupListeners(store.dispatch)
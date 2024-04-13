import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { tracksApi } from "./queryApi/tracksJamendo";
import { searchApi } from "./queryApi/searchJamendo";
import { artistsApi } from "./queryApi/getArtists";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [tracksApi.reducerPath]: tracksApi.reducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    user: userReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(
      tracksApi.middleware,
      searchApi.middleware,
      artistsApi.middleware
    ),
});
setupListeners(store.dispatch);

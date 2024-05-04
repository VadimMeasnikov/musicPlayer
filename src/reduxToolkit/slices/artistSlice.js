import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artistData: []
  },
  reducers: {
    addArtistData: (state, action) => {
      state.artistData = action.payload;
    },
    clearArtistData: (state) => {
      state.artistData = null;
    }
  },
});

export const { addArtistData, clearArtistData } = artistSlice.actions;
export default artistSlice.reducer;

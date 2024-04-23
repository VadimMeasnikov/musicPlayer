import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  playlists: [],
};

const playlistSlice = createSlice({
  name: "playlistsSlice",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.playlists = action.payload.playlists;
    },
  },
});

export const { addPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;

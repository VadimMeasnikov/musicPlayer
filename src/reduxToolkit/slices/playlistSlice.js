import { createSlice } from "@reduxjs/toolkit";
const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    tracks: []
  },
  reducers: {
    addPlaylist: (state, action) => {
      state.tracks.push(action.payload);
    },
  },
});
export const { addPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;

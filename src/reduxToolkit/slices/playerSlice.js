import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playlist: [],
  currentTrackIndex: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
      state.currentTrackIndex = 0;
    },
    setCurrentTrack: (state, action) => {
      const index = state.playlist.findIndex(
        (track) => track.id === action.payload
      );
      if (index !== -1) {
        state.currentTrackIndex = index;
      }
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex < state.playlist.length - 1) {
        state.currentTrackIndex += 1;
      }
    },
    prevTrack: (state) => {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex -= 1;
      }
    },
  },
});

export const { setPlaylist, setCurrentTrack, nextTrack, prevTrack } =
  playerSlice.actions;

export default playerSlice.reducer;

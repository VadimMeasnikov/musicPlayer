import { createSlice } from "@reduxjs/toolkit";
const favouriteTracks = createSlice({
    name: "likes",
    initialState: {
        likedTracks: []
    },
    reducers: {
        addLikedTrack: (state, action) => {
            state.likedTracks.push(action.payload);
        },
        removeLikedTracks: (state, action) => {
            state.likedTracks = state.likedTracks.filter(track => track.id !== action.payload)
        }
    }
});
export const {addLikedTrack, removeLikedTracks} = favouriteTracks.actions;
export default favouriteTracks.reducer;
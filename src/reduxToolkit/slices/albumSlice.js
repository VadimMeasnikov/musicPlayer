import { createSlice } from "@reduxjs/toolkit";
const albumSlice = createSlice({
    name: "album",
    initialState: {
        album: []
    },
    reducers: {
        addAlbum: (state, action) => {
            state.album = action.payload;
        },
        clearAlbum: (state) => {
            state.album = null;
        }
    }
});
export const {addAlbum, clearAlbum} = albumSlice.actions;
export default albumSlice.reducer;
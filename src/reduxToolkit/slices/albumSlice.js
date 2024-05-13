import { createSlice } from "@reduxjs/toolkit";
const albumSlice = createSlice({
    name: "album",
    initialState: {
        albumData: null
    },
    reducers: {
        addAlbum: (state, action) => {
            state.albumData = action.payload.albumData;
        },
        clearAlbum: (state) => {
            state.albumData = null;
        }
    }
});
export const { addAlbum, clearAlbum } = albumSlice.actions;
export default albumSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const albumSlice = createSlice({
    name: "album",
    initialState: {
        albumData: null,
        albumId: null,
        isCustomPlaylist: false
    },
    reducers: {
        addAlbum: (state, action) => {
            state.albumData = action.payload.albumData;
            state.albumId = uuidv4();
            state.isCustomPlaylist = action.payload.isCustomPlaylist || false;
        },
        clearAlbum: (state) => {
            state.albumData = null;
            state.albumId = null;
            state.isCustomPlaylist = false;
        }
    }
});
export const { addAlbum, clearAlbum } = albumSlice.actions;
export default albumSlice.reducer;

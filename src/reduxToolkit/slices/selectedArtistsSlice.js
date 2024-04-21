import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedArtists: [] 
};

const selectedArtistsSlice = createSlice({
    name: 'selectedArtists',
    initialState,
    reducers: {
        selectArtist: (state, action) => {
            state.selectedArtists.push(action.payload); 
        },
        removeArtist: (state, action) => {
            state.selectedArtists = state.selectedArtists.filter(artist => artist.id !== action.payload);
        },
    },
});

export const { selectArtist, removeArtist } = selectedArtistsSlice.actions; 
export default selectedArtistsSlice.reducer; 
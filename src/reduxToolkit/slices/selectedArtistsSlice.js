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
       
    },
});

export const { selectArtist } = selectedArtistsSlice.actions; 
export default selectedArtistsSlice.reducer; 
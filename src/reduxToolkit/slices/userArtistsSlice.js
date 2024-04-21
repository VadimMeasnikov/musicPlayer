import { createSlice } from '@reduxjs/toolkit';

const userArtistsSlice = createSlice({
    name: 'userArtists',
    initialState : {
        userAppArtists: []
    },
    reducers: {
        setArtists: (state, action) => {
            state.userAppArtists.push(action.payload); 
        },
        removeArtists: (state, action) => {
            state.selectedArtists = state.userAppArtists.filter(artist => artist.id !== action.payload);
        },
    },
});

export const { setArtists, removeArtists } = userArtistsSlice.actions; 
export default userArtistsSlice.reducer; 
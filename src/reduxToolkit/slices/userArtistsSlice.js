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
       
    },
});

export const { setArtists } = userArtistsSlice.actions; 
export default userArtistsSlice.reducer; 
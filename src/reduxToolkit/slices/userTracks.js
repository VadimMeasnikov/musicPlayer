import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'userTracks',
    initialState: {
        favouriteSongs: [],
        likedSongs: [],
        listenedSongs: [],
    },
    reducers: {
        setFavouriteSongs(state, action){
            state.favouriteSongs= action.payload.favouriteSongs
        },
        setLikedSongs(state, action){
            state.likedSongs= action.payload.likedSongs
        },
        setListenedSongs(state, action){
            state.listenedSongs = action.payload.listenedSongs
        }
    }
})

export const {setArtists, setFavouriteSongs, setLikedSongs, setListenedSongs} = userTracks.actions
export default userTracks.reducer
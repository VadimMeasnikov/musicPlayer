import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'userTracks',
    initialState: {
        favouriteSongs: null,
        likedSongs: null,
        artists: null,
        listenedSongs: null,
    },
    reducers: {
        setFavouriteSongs(state, action){
            state.favouriteSongs= action.payload.favouriteSongs
            // obj{
            //     ...oldObj,
            //     {
            //         artist: '',
            //         song: '',

            //     }
            // }
        },
        setLikedSongs(state, action){
            state.likedSongs= action.payload.likedSongs
        },
        setArtists(state, action){
            state.artists = action.payload.artists
        },
        setListenedSongs(state, action){
            state.listenedSongs = action.payload.listenedSongs
        }

    }
})

export const {setArtists, setFavouriteSongs, setLikedSongs, setListenedSongs} = userTracks.actions
export default userTracks.reducer
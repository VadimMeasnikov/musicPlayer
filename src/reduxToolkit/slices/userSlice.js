import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        id: null,
        username: null,
        news: null,
        share: null,
        search: [],
        // artists: []
    },
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.news = action.payload.news;
            state.share = action.payload.share;
            state.search = action.payload.search;
            // state.artists = action.payload.artists;
        },
        removeUser(state){
            state.email = null
            state.id = null
            state.username = null
            state.news = null
            state.share = null
            state.search =  null
            // state.artists = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer
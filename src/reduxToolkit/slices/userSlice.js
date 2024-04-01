import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        password: null,
        username: null,
        news: null,
        share: null,
    },
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.username = action.payload.username;
            state.news = action.payload.news;
            state.share = action.payload.share;
        },
        removeUser(state){
            state.email = null
            state.password = null
            state.username = null
            state.news = null
            state.share = null
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer
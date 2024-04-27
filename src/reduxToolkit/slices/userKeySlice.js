import {createSlice} from '@reduxjs/toolkit'

const userKeySlice = createSlice({
    name: 'userKey',
    initialState: {
       key : null
    },
    reducers: {
        setKey(state, action){
            state.key = action.payload.key;
        },
        removeKey(state){
            state.key = null
        }
    }
})

export const {setKey, removeKey} = userKeySlice.actions
export default userKeySlice.reducer
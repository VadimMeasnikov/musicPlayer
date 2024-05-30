import {createSlice} from '@reduxjs/toolkit'

const appAudio = createSlice({
    name: 'appAudio',
    initialState: {
       audio : null,
       isPlay: false
    },
    reducers: {
        setAudio(state, action){
            state.audio = action.payload.audio;
            state.isPlay = action.payload.isPlay
        },
        removeAudio(state){
            state.audio = null
            state.isPlay = false
        }
    }
})

export const {setAudio, removeAudio} = appAudio.actions
export default appAudio.reducer
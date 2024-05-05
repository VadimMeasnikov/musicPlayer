import {createSlice} from '@reduxjs/toolkit'

const userPhotoSlice = createSlice({
    name: 'userPhoto',
    initialState: {
       photo : null
    },
    reducers: {
        setPhoto(state, action){
            state.photo = action.payload.photo;
        }
    }
})

export const {setPhoto} = userPhotoSlice.actions
export default userPhotoSlice.reducer
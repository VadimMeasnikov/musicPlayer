import { createSlice } from "@reduxjs/toolkit";
const historySlice = createSlice({
    name: "history",
    initialState: {
        historyArray: []
    },
    reducers: {
        addTrackToHistory: (state, action) => {
            state.historyArray.push(action.payload);
        },
        clearHistory: (state) => {
            state.historyArray = null
        }
    }
});
export const {addTrackToHistory, clearHistory} = historySlice.actions;
export default historySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    body: null
}

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setDetails: (state, action)=>{
            state.body = action.payload
        }
    }
})

export const {setDetails} = resumeSlice.actions
export default resumeSlice.reducer
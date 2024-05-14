import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import resumeSlice from './slices/resumeSlice'

export const store = configureStore({
    reducer: {
        "user": userSlice,
        "resume": resumeSlice
    }
})
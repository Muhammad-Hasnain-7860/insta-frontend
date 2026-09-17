import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../../features/auth/state/authSlice'
import postSlice from '../../features/main/state/postSlice'
export const store = configureStore({
    reducer : {
        authSlice : authSlice,
        postSlice : postSlice
    }
})
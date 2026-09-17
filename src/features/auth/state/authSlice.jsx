import { createSlice } from "@reduxjs/toolkit";
import { authRegisterThunk, getMeThunk, loginThunk, refreshThunk } from "../apis/authThank";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    accessToken: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(authRegisterThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(authRegisterThunk.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.user = action.payload.data.user),
          (state.accessToken = action.payload.token));
      })
      .addCase(authRegisterThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(refreshThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        state.isLoading = false
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getMeThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload?.data?.user;
        state.isLoading = false
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loginThunk.pending , (state , action)=>{
        state.isLoading = true
      })
      .addCase(loginThunk.fulfilled , (state ,action)=>{
        state.user = action.payload?.data?.user 
        state.accessToken = action.payload?.token
        state.isLoading = false
      })
      .addCase(loginThunk.rejected , (state , action)=>{
        state.isLoading = false
      })
  },
});

export default authSlice.reducer;

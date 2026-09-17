import { createSlice } from "@reduxjs/toolkit";
import { createPostThunk, editPostThunk, getAllPostsThunk, getAllUsersThunk } from "../apis/postThunk";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPost: [],
    allUsers: [],
    isLoading: false,
    postUpdateData: null,
  },

  reducers: {
    updatePostData: (state, action) => {
      state.postUpdateData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.allPost = action.payload?.data?.posts));
      })
      .addCase(getAllPostsThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllUsersThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        ((state.isLoading = true),
          (state.allUsers = action.payload?.data?.users));
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createPostThunk.pending , (state , action)=>{
        state.isLoading = true
      })
      .addCase(createPostThunk.fulfilled , (state , action)=>{
        state.isLoading = false
      })
      .addCase(createPostThunk.rejected , (state , action)=>{
        state.isLoading = false
      })
      .addCase(editPostThunk.pending , (state , action)=>{
        state.isLoading = true
      })
      .addCase(editPostThunk.fulfilled , (state , action)=>{
        state.isLoading = false
      })
      .addCase(editPostThunk.rejected , (state , action)=>{
        state.isLoading = false
      })
  },
});

export const { updatePostData } = postSlice.actions;

export default postSlice.reducer;

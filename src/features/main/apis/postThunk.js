import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../app/config/axiosInstance";

const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("/post");
    console.log(response, "posts");
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/auth");
    console.log(response, "users");
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};

const postLike = async (id) => {
  try {
    const response = await axiosInstance.post(`/post/like/${id}`);
  } catch (error) {
    console.log(error.message, "Post Like Error");
    Promise.reject(error);
  }
};

const postComment = async (id, text, commentId) => {
  const url = commentId ? `/post/replay/${id}` : `/post/comment/${id}`;
  const body = commentId ? { text, commentId } : { text };

  try {
    const response = await axiosInstance.post(url, body);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const commentReplayDelete = async (id, commentId, replayId) => {
  const url = replayId ? `/post/replaydel/${id}` : `/post/commentdel/${id}`;
  const body = replayId ? { commentId, replayId } : { commentId };

  console.log(url, body);

  try {
    const response = await axiosInstance.delete(url, {
      data: body,
    });
    console.log(response);
  } catch (error) {
    console.log(error.message, "comment delete error");
    Promise.reject(error);
  }
};

const commentReplayEdit = async (id, commentId, text, replayId) => {
  const url = replayId ? `/post/replay/${id}` : `/post/comment/${id}`;
  const body = replayId ? { text, commentId, replayId } : { text, commentId };

  try {
    const response = await axiosInstance.put(url, body);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const createPost = async (data) => {
  try {
    const response = await axiosInstance.post("/post/create", data);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const deleteAndEditPost = async (id) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const editPost = async ({ id, data }) => {
  try {
    const response = await axiosInstance.put(`/post/postEdit/${id}`, data);
    console.log(response);
  } catch (error) {
    console.log(error.message, "post edit Error");
    Promise.reject(error);
  }
};

const followUser = async (id) => {
  try {
    const response = await axiosInstance.post(`/follow/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const unFollowUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/follow/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

const getAllPostsThunk = createAsyncThunk("allPosts", getAllPosts);
const getAllUsersThunk = createAsyncThunk("allUsers", getAllUsers);
const createPostThunk = createAsyncThunk("create-post", createPost);
const editPostThunk = createAsyncThunk("edit-post", editPost);

export {
  getAllPostsThunk,
  getAllUsersThunk,
  postLike,
  postComment,
  commentReplayDelete,
  commentReplayEdit,
  createPost,
  deleteAndEditPost,
  editPost,
  createPostThunk,
  editPostThunk,
  followUser,
  unFollowUser
};

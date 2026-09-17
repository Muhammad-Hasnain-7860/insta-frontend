import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../app/config/axiosInstance";

const registerApiHandle = async (data) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    console.log(res)
    return res.data;
  } catch (error) {
    console.log(error.message, "Register Api Error");
    return Promise.reject(error)

  }
};

const refreshApiHandle = async () => {
  try {
    const res = await axiosInstance.post("/auth/refresh-token");
    console.log(res)
    return res.data;
  } catch (error) {
    console.log('refresh Api error', error.message)
    return Promise.reject(error)
  }
};

const getMeApi = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message, "getMe Error");
    return Promise.reject(error)

  }
};

const loginApi = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login' , data)
    return response.data
  } catch (error) {
    console.log(error)
    Promise.reject(error)
  }
}

const authRegisterThunk = createAsyncThunk("authRegister", registerApiHandle);
const refreshThunk = createAsyncThunk("authRefresh", refreshApiHandle);
const getMeThunk = createAsyncThunk("getMe", getMeApi);
const loginThunk = createAsyncThunk('login', loginApi)
export { authRegisterThunk, refreshThunk, getMeThunk , loginThunk };

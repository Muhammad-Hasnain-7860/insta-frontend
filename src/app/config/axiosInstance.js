import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://insta-backend-dun.vercel.app",
  withCredentials: true,
});

export default axiosInstance;

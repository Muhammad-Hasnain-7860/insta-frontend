import { refreshThunk } from "../../features/auth/apis/authThank";
import axiosInstance from "./axiosInstance";

const stepUpInterceptor = (store) => {
    axiosInstance.interceptors.request.use((config) => {
        const accessToken = store.getState().authSlice.accessToken;
        config.headers.Authorization = accessToken;
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error.response?.status;

            if (status === 401 && !error.config.url.includes('/auth/refresh-token')) {
                await store.dispatch(refreshThunk()).unwrap()
                return axiosInstance(error.config);
            } else {
                return Promise.reject(error)
            }
        },
    );
}


export default stepUpInterceptor
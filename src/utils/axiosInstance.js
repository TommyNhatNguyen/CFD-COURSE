import axios from "axios";
import { BASE_URL } from "../constants/environments";
import tokenMethod from "./token";
import authService from "../services/authService";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Gắn authorization vào header
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("error", error);
    const originalRequest = error.config;
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await authService.refreshToken({
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data.data || {};
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log("error", error);
        tokenMethod.remove();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

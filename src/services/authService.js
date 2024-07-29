import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getProfile(query = "") {
    return axiosInstance.get(`/customer/profiles${query}`, {
      headers: {},
    });
  },
  updateProfile(payload = {}) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  refreshToken(payload = {}) {
    return axiosInstance.put(`/customer/refresh`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
export default authService;

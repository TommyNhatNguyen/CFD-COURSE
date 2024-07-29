import axiosInstance from "../utils/axiosInstance";

const subscribeService = {
  subscribes(payload = {}) {
    return axiosInstance.post("/subscribes", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default subscribeService;

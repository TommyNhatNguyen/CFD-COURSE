import axiosInstance from "../utils/axiosInstance";

const rateService = {
  getService(query = "") {
    return axiosInstance.get(`/rates${query}`);
  },
  getServiceBySlug(slug = "") {
    return axiosInstance.get(`/rates${slug}`);
  },
};

export default rateService;

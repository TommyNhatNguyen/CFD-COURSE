import axiosInstance from "../utils/axiosInstance";

const questionService = {
  getService(query = "") {
    return axiosInstance.get(`/questions${query}`);
  },
  getServiceById(id = "") {
    return axiosInstance.get(`/questions${id}`);
  },
};

export default questionService;

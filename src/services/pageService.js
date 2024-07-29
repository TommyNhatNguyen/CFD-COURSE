import axiosInstance from "../utils/axiosInstance";

const pageService = {
  getPages(query = "") {
    return axiosInstance.get(`/pages${query}`);
  },
  getPagesByName(name = "") {
    return axiosInstance.get(`/pages${name}`);
  },
};
export default pageService;

import axiosInstance from "../utils/axiosInstance";

const courseService = {
  getCourse(query = "") {
    return axiosInstance.get(`/courses${query}`);
  },
  getCourseBySlug(slug = "") {
    return axiosInstance.get(`/courses${slug}`);
  },
};
export default courseService;

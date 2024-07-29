import axiosInstance from "../utils/axiosInstance";

const blogService = {
  getBlogs(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getBlogsBySlug(slug = "") {
    return axiosInstance.get(`/blogs${slug}`);
  },
  getBlogCategoires(query = "") {
    return axiosInstance.get(`/blog-categories${query}`);
  },
  getBlogCategoiresBySlug(slug = "") {
    return axiosInstance.get(`/blog-categories${slug}`);
  },
};

export default blogService;

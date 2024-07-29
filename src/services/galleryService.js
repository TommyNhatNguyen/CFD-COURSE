import axiosInstance from "../utils/axiosInstance";

const galleryService = {
  getGalleries(query = "") {
    return axiosInstance.get(`/galleries${query}`);
  },
  getGalleriesBySlug(slug = "") {
    return axiosInstance.get(`/galleries${slug}`);
  },
};

export default galleryService;

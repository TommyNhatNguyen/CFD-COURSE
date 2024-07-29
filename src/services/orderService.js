import axiosInstance from "../utils/axiosInstance";

const orderService = {
  getOrderPayment(query = "") {
    return axiosInstance.get(`/orders/me${query}`);
  },
  getOrderCourse(query = "") {
    return axiosInstance.get(`/orders/courses/me${query}`);
  },
  orderCourse(payload = {}) {
    return axiosInstance.post(`/orders`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default orderService;

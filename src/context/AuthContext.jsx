import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import tokenMethod from "../utils/token";
import orderService from "../services/orderService";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState("");
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [messageAPI, contextHodler] = message.useMessage();
  const [profile, setProfile] = useState();
  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setModalShow(modalType || "");
      document.body.classList.add("fixed");
    }
  };
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setModalShow("");
    document.body.classList.remove("fixed");
  };
  useEffect(() => {
    if (tokenMethod.get()) {
      handleGetProfile?.();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);
  // Handle Login
  const handleLogin = async (loginData, callback) => {
    try {
      const { email, password } = loginData;
      const payload = { email, password };
      const loginResponse = await authService.login(payload);
      // Kiểm tra có data
      if (loginResponse?.data?.data) {
        // Lấy token'
        const { token: accessToken, refreshToken } = loginResponse?.data?.data;
        tokenMethod.set({ accessToken, refreshToken });
        // Lấy profile
        handleGetProfile?.();
        messageAPI.success("Đăng nhập thành công");
        handleCloseModal();
        // Lấy course đã đăng ký của profile
        handleGetProfileCourse?.();
        handleGetProfilePayment?.();
      }
    } catch (error) {
      console.log("error", error);
      messageAPI.error("Đăng nhập không thành công");
    } finally {
      callback?.();
    }
  };
  // Handle register
  const handleRegister = async (registerData, callback) => {
    try {
      const { name, email, password } = registerData;
      const payload = {
        firstName: name,
        lastName: "",
        email: email,
        password: password,
      };
      const registerResponse = await authService.register(payload);
      if (registerResponse?.data?.data) {
        messageAPI.success("Đăng ký thành công");
        // Login
        handleLogin?.({ email, password });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };
  // Handle get profile
  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };
  // Handle Logout
  const handleLogout = () => {
    tokenMethod?.remove();
    setProfile(undefined);
    setPaymentInfo(undefined);
    setCourseInfo(undefined);
  };
  // Handle get profile course
  async function handleGetProfileCourse() {
    try {
      const res = await orderService.getOrderCourse();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  }
  async function handleGetProfilePayment() {
    try {
      const res = await orderService.getOrderPayment();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  }
  async function handleUpdateProfile(profileData) {
    try {
      const payload = {
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        facebookURL: profileData?.facebookURL || "",
        website: profileData?.website || "",
        phone: profileData?.phone || "",
        introduce: profileData?.introduce || "",
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data) {
        messageAPI.success("Cập nhật thông tin thành công");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        modalShow,
        handleShowModal,
        handleCloseModal,
        messageAPI,
        handleLogin,
        handleRegister,
        profile,
        handleLogout,
        handleGetProfile,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleUpdateProfile,
        courseInfo,
        paymentInfo,
      }}
    >
      {contextHodler}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

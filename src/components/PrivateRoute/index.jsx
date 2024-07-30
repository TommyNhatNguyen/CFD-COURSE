import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import tokenMethod from "../../utils/token";
import { useAuthContext } from "../../context/AuthContext";
import PATHS from "../../constants/paths";
import { MODAL_TYPES } from "../../constants/general";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { handleShowModal, messageAPI } = useAuthContext();
  const navigate = useNavigate();
  // const location = useLocation(-1);
  // console.log("location", location);
  useEffect(() => {
    if (!!!tokenMethod.get()) {
      handleShowModal?.(MODAL_TYPES.login);
      navigate(-1);
      messageAPI.warning("Đăng nhập trước khi đăng ký khoá học");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;

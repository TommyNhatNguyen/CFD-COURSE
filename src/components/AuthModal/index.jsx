import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export const AuthModal = () => {
  const { modalShow, handleCloseModal } = useAuthContext();
  return (
    <div className={`modal modallogin ${modalShow && "open"}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={handleCloseModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        {modalShow === "login" && <LoginForm />}
        {modalShow === "register" && <RegisterForm />}
      </div>
      <div className="modal__overlay" />
    </div>
  );
};

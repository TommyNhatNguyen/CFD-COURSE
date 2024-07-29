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
        {/* <div className="modal__wrapper-content mdconsult">
          <h3 className="title --t3">Đăng ký tư vấn</h3>
          <form action="#" className="form">
            <div className="form-group">
              <input
                defaultValue
                type="text"
                className="form__input formerror"
                placeholder="Họ và tên"
              />
              <p className="error">Họ và tên không được để trống</p>
            </div>
            <div className="form-group">
              <input
                defaultValue
                type="text"
                className="form__input"
                placeholder="Số điện thoại"
              />
            </div>
            <div className="form-group">
              <input
                defaultValue
                type="email"
                className="form__input"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <textarea
                name
                id
                cols={30}
                rows={4}
                className="form__input"
                placeholder="Nội dung cần tư vấn"
                defaultValue={""}
              />
            </div>
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div>
        <div className="modal__wrapper-content mdchangepass">
          <h3 className="title --t3">Đổi mật khẩu</h3>
          <form action="#" className="form">
            <div className="form-group">
              <input
                defaultValue
                type="password"
                className="form__input formerror"
                placeholder="Mật khẩu cũ"
              />
              <p className="error">Mật khẩu không được để trống</p>
            </div>
            <button
              className="btn btn--primary form__btn-register"
              type="submit"
            >
              Gửi thông tin
            </button>
          </form>
        </div> */}
      </div>
      <div className="modal__overlay" />
    </div>
  );
};

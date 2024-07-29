import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Input from "../../Input";
import Button from "../../Button";
import ComponentLoading from "../../ComponentLoading";
import { MODAL_TYPES } from "../../../constants/general";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const login = (loginFied) => {
    return {
      name: loginFied,
      error: error[loginFied],
      onChange: (e) =>
        setForm((prevForm) => {
          return { ...prevForm, [loginFied]: e.target.value };
        }),
    };
  };
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = {};
    // Start validate
    if (!!!form.email) {
      errorObject.email = "Vui lòng điền email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.email)) {
      errorObject.email = "Email không đúng định dạng";
    }
    if (!!!form.password) {
      errorObject.password = "Vui lòng điền mật khẩu";
    }
    setError(errorObject);
    // End validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      // Call API
      setLoading(true);
      handleLogin?.(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  };
  return (
    <div className="modal__wrapper-content mdlogin active">
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div className="color--primary btnmodal" data-modal="mdregister">
          <strong onClick={() => handleShowModal(MODAL_TYPES.register)}>
            Đăng ký
          </strong>
        </div>
      </div>
      <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng nhập bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng nhập bằng Google</span>
        </a>
      </div>
      <span className="line">Hoặc</span>
      <form action="#" className="form">
        <Input
          label="Email"
          placeholder="Email"
          type="email"
          required={true}
          {...login("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Mật khẩu"
          type="password"
          required={true}
          {...login("password")}
        />
        <div className="form__bottom">
          <a className="color--primary" href="#">
            Quên mật khẩu?
          </a>
        </div>
        <Button
          className="form__btn-register"
          type="submit"
          onClick={_onSubmit}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

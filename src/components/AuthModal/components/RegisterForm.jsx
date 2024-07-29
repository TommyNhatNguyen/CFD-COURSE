import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import Input from "../../Input";
import Button from "../../Button";
import ComponentLoading from "../../ComponentLoading";
import { MODAL_TYPES } from "../../../constants/general";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, messageAPI, handleRegister } =
    useAuthContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      onChange: (e) => {
        setForm((prevForm) => {
          return {
            ...prevForm,
            [registerField]: e.target.value,
          };
        });
      },
    };
  };
  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = {};
    // Start validate
    if (!!!form.name) {
      errorObject.name = "Vui lòng điền họ và tên";
    }
    if (!!!form.email) {
      errorObject.email = "Vui lòng điền email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.email)) {
      errorObject.email = "Email không đúng định dạng";
    }
    if (!!!form.password) {
      errorObject.password = "Vui lòng điền mật khẩu";
    }
    if (!!!form.confirmPassword) {
      errorObject.confirmPassword = "Vui lòng điền xác nhận mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      errorObject.confirmPassword = "Mật khẩu không khớp";
      errorObject.password = "Mật khẩu không khớp";
    }
    setError(errorObject);
    // End validate
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      console.log("form", form);
      // Call API
      setLoading(true);
      handleRegister?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  };
  return (
    <div className="modal__wrapper-content mdregister active">
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div className="color--primary btnmodal" data-modal="mdlogin">
          <strong
            onClick={() => {
              handleShowModal(MODAL_TYPES.login);
            }}
          >
            Đăng nhập
          </strong>
        </div>
      </div>
      <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
      </div>
      <span className="line">Hoặc</span>
      <form action="#" className="form">
        <Input
          label="Họ và tên"
          placeholder="Họ và tên"
          required={true}
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Email"
          required={true}
          {...register("email")}
        />
        <Input
          label="Mật khẩu"
          placeholder="Mật khẩu"
          required={true}
          {...register("password")}
        />
        <Input
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          required={true}
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý
          <Link
            to={PATHS.PRIVACY}
            className="color--primary"
            href="#"
            onClick={handleCloseModal}
          >
            &nbsp;Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button
          className="form__btn-register"
          type="submit"
          onClick={_onSubmit}
        >
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

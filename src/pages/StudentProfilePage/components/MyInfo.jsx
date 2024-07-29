import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";

const MyInfo = () => {
  const initialForm = useRef({
    firstName: "",
    email: "",
    phone: "",
    facebookURL: "",
    website: "",
    introduce: "",
  });
  const { profile, handleUpdateProfile } = useAuthContext();
  const [isUpdated, setIsUpdated] = useState(false);
  const [form, setForm] = useState(initialForm.current);
  useEffect(() => {
    const newForm = {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      facebookURL: profile?.facebookURL || "",
      website: profile?.website || "",
      phone: profile?.phone || "",
      introduce: profile?.introduce || "",
    };
    setForm(newForm);
    initialForm.current = newForm;
  }, [JSON.stringify(profile)]);
  const [error, setError] = useState([]);
  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errorObject = {};
      if (!!!form.firstName) {
        errorObject.firstName = "Họ và tên không được để trống";
      }
      if (!!!form.phone) {
        errorObject.phone = "Điện thoại không được để trống";
      } else if (!/(84|0[2|3|5|7|8|9])+([0-9]{8})\b/g.test(form.phone)) {
        errorObject.phone = "Điện thoại không đúng định dạng";
      }
      if (
        form.facebookURL &&
        !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
          form.facebookURL
        )
      ) {
        errorObject.facebookURL = "Vui lòng nhập đúng định dạng website";
      }

      if (
        form.website &&
        !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(
          form.website
        )
      ) {
        errorObject.website = "Vui lòng nhập đúng định dạng website";
      }

      setError(errorObject);
      if (Object.keys(errorObject)?.length > 0) {
        console.log("error", errorObject);
      } else {
        setIsUpdated(true);
        handleUpdateProfile?.(form);
      }
    },
    [form, error]
  );
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      onChange: (e) => {
        setForm((prev) => {
          return { ...prev, [registerField]: e.target.value };
        });
      },
    };
  };
  const isFormChanged =
    JSON.stringify(initialForm.current) !== JSON.stringify(form);
  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form action="#" className="form" style={{ position: "relative" }}>
        <div className="form-container">
          <Input
            label="Họ và tên"
            placeholder="Họ và tên"
            defaultValue={profile?.firstName || ""}
            required
            {...register("firstName")}
          />
          <Input
            label="Số điện thoại"
            placeholder="Số điện thoại"
            defaultValue={profile?.phone || ""}
            required
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          <div className="form-group">
            <label className="label">
              Email <span>*</span>
            </label>
            <input
              defaultValue={profile?.email || ""}
              disabled
              type="email"
              className="form__input"
            />
          </div>
          <div className="form-group">
            <div className="form-grouppass">
              <label className="label">
                Mật khẩu <span>*</span>
              </label>
              <div className="textchange btnmodal" data-modal="mdchangepass">
                Đổi mật khẩu
              </div>
            </div>
            <input
              defaultValue={12345568900}
              type="password"
              disabled
              className="form__input"
            />
          </div>
        </div>
        <Input
          label="Facebook URL"
          placeholder="Facebook URL"
          defaultValue={profile?.facebookURL || ""}
          {...register("facebookURL")}
        />
        <Input
          label="Website"
          placeholder="Website"
          defaultValue={profile?.website || ""}
          {...register("website")}
        />

        <div className="form-container textarea">
          <Input
            label="Giới thiệu bản thân"
            widthStyle={{ width: "100%" }}
            defaultValue={profile?.introduce || ""}
            renderInput={(inputProps) => {
              return <TextArea style={{ height: "100px" }} {...inputProps} />;
            }}
            {...register("introduce")}
          />
        </div>
        {isUpdated && !isFormChanged && (
          <p className="noti">Cập nhận thông tin thành công</p>
        )}
        <div className="form-group">
          <div className="btnsubmit">
            <Button
              style={{
                width: "100%",
                pointerEvents: isFormChanged ? "all" : "none",
              }}
              onClick={_onSubmit}
              disabled={!isFormChanged}
            >
              Lưu lại
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;

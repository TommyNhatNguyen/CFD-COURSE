import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Input from "../../../components/Input";
import { useAuthContext } from "../../../context/AuthContext";
import Select from "../../../components/Select";

const FormOrder = ({ types, disabled }, ref) => {
  //   const [form, setForm] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     type: "",
  //   });
  //   const [error, setError] = useState({});

  //   const register = (registerName) => {
  //     return {
  //       name: registerName,
  //       value: form[registerName],
  //       error: error[registerName],
  //       onChange: (e) => {
  //         setForm((prev) => {
  //           return {
  //             ...prev,
  //             [registerName]: e.target.value,
  //           };
  //         });
  //       },
  //     };
  //   };

  //   const { profile } = useAuthContext();
  //   const {
  //     firstName: profileName,
  //     email: profileEmail,
  //     phone: profilePhone,
  //   } = profile || {};

  //   useEffect(() => {
  //     setForm({
  //       name: profileName,
  //       email: profileEmail,
  //       phone: profilePhone,
  //       type: "",
  //     });
  //   }, [profileName, profileEmail, profilePhone]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });
  const [error, setError] = useState({});

  const register = (registerName) => {
    return {
      name: registerName,
      value: form[registerName],
      error: error[registerName],
      onChange: (e) => setForm({ ...form, [registerName]: e.target.value }),
    };
  };
  const { profile } = useAuthContext();
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  useEffect(() => {
    setForm({
      name: profileName || "",
      email: profileEmail || "",
      phone: profilePhone || "",
      type: "",
    });
  }, [profileName, profileEmail, profilePhone]);
  const _onFormOrderSubmit = () => {
    // start validate OrderForm
    const errorObject = {};

    if (!!!form.name) {
      console.log("form.name", form.name);
      errorObject.name = "Vui lòng nhập tên";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!/(84|0[2|3|5|7|8|9])+([0-9]{8})\b/g.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }

    if (!!!form.type) {
      errorObject.type = "Vui lòng chọn phương thức học";
    }

    setError(errorObject);
    // end validate

    if (Object.keys(errorObject).length > 0) {
      console.log("Profile form validate failed", errorObject);
      return null;
    } else {
      console.log("Profile form validate success", form);
      return form;
    }
  };
  const typeOptions =
    types?.length > 0
      ? [
          { value: "", label: "--" },
          ...types.map((type) => {
            return { value: type, label: type };
          }),
        ]
      : [{ value: "", label: "--" }];

  useImperativeHandle(ref, () => {
    return {
      onSubmit: () => _onFormOrderSubmit(),
      updateForm(updatedValue) {
        setForm((prev) => {
          return {
            ...prev,
            ...updatedValue,
          };
        });
      },
    };
  });

  return (
    <div className="itemorder formorder">
      <h3 className="title --t3">Thông tin cá nhân</h3>
      <div className="boxorder">
        <form action="#" className="form">
          <div className="form-container">
            <Input
              label="Họ và tên"
              placeholder="Họ và tên"
              required
              {...register("name")}
              disabled={disabled}
            />
            <Input
              label="Email"
              placeholder="Email"
              required
              disabled
              {...register("email")}
            />
          </div>
          <div className="form-container">
            <Input
              label="Số điện thoại"
              placeholder="Số điện thoại"
              required
              disabled={disabled}
              {...register("phone")}
            />
            <Input
              label="Hình thức học"
              required
              disabled={disabled}
              {...register("type")}
              renderInput={(inputProps) => {
                return <Select {...inputProps} options={typeOptions} />;
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default forwardRef(FormOrder);

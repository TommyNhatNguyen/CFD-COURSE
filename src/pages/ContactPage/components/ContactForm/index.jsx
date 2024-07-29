import React, { useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Select from "../../../../components/Select";
import TextArea from "../../../../components/TextArea";

const ContactForm = ({ handleSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });

  const [error, setError] = useState({});

  function _onSubmit(e) {
    e.preventDefault();
    const errorObject = {};
    if (!!!form.name) {
      errorObject.name = "Họ và tên không được để trống";
    }
    if (!!!form.email) {
      errorObject.email = "Email không được để trống";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(form.email)) {
      errorObject.email = "Email không đúng định dạng";
    }

    if (!!!form.phone) {
      errorObject.phone = "Điện thoại không được để trống";
    } else if (!/(84|0[2|3|5|7|8|9])+([0-9]{8})\b/g.test(form.phone)) {
      errorObject.phone = "Điện thoại không đúng định dạng";
    }
    if (!!!form.topic) {
      errorObject.topic = "Chủ đề không được để trống";
    }
    if (!!!form.content) {
      errorObject.content = "Nội dung không được để trống";
    }
    setError(errorObject);
    // Handle submit
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      handleSubmit?.(form);
    }
  }

  // function _onChange(e) {
  //   const { value, name } = e.target;
  //   setForm((prevForm) => {
  //     return { ...prevForm, [name]: value };
  //   });
  // }

  function register(registerField) {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) =>
        setForm((prevForm) => {
          return { ...prevForm, [registerField]: e.target.value };
        }),
    };
  }

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input label={"Họ và tên"} required={true} {...register("name")} />
      <Input label={"Email"} required={true} {...register("email")} />
      <Input label={"Số điện thoại"} required={true} {...register("phone")} />
      <Input
        label={"Chủ đề cần hỗ trợ"}
        required={true}
        {...register("topic")}
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
      />

      <Input
        label="Nội dung"
        required={true}
        {...register("content")}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      />

      <div className="btncontrol">
        <Button onClick={_onSubmit}>Gửi</Button>
      </div>
    </div>
  );
};

export default ContactForm;

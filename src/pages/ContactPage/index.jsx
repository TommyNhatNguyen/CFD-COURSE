import React, { useState } from "react";
import ContactTitle from "./components/ContactTitle";
import ContactSidebar from "./components/ContactSidebar";
import ContactForm from "./components/ContactForm";
import { Navigate, useNavigate } from "react-router-dom";
import subscribeService from "../../services/subscribeService";
import PATHS from "../../constants/paths";
import { useAuthContext } from "../../context/AuthContext";
import useMutation from "../../hooks/useMutation";

const ContactPage = () => {
  const isLogin = true;
  const navigate = useNavigate();
  const { messageAPI } = useAuthContext();
  const { execute } = useMutation(subscribeService.subscribes);

  const handleSubmit = (formData) => {
    const payload = {
      name: formData?.name || "",
      email: formData?.email || "",
      phone: formData?.phone || "",
      title: formData?.topic || "",
      description: formData?.content || "",
    };
    execute?.(payload, {
      onSuccess: (data) => {
        console.log("data", data);
        navigate(PATHS.HOME);
        messageAPI.success("Liên hệ thành công");
      },
      onFail: (error) => {
        console.log("error", error);
        messageAPI.error("Liên hệ thất bại");
      },
    });
  };

  if (!isLogin) return <Navigate to="/" />;

  return (
    <main className="mainwrapper contact --ptop">
      <div className="container">
        <ContactTitle />
      </div>
      <div className="contact__content">
        <div className="container">
          <div className="wrapper">
            <ContactSidebar />
            <ContactForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;

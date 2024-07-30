import React from "react";

import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Overlay } from "../components/Overlay";
import { Footer } from "../components/Footer";
import { AuthModal } from "../components/AuthModal";
import { Outlet, useLocation } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import { AuthContextProvider } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { ThemeProvider } from "styled-components";

const MainLayout = () => {
  const theme = {
    transition: "0.3s",
    blackOpacityBg: "rgba(0,0,0,0.5)",
  };
  return (
    <ThemeProvider theme={theme}>
      <MainContextProvider>
        <AuthContextProvider>
          <Header />
          <Navbar />
          {createPortal(<Overlay />, document.body)}
          <Outlet />
          <Footer />
          {createPortal(<AuthModal />, document.body)}
        </AuthContextProvider>
      </MainContextProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

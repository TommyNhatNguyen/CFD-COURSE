import React from "react";

import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Overlay } from "../components/Overlay";
import { Footer } from "../components/Footer";
import { AuthModal } from "../components/AuthModal";
import { Outlet } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import { AuthContextProvider } from "../context/AuthContext";
import { createPortal } from "react-dom";

const MainLayout = () => {
  return (
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
  );
};

export default MainLayout;

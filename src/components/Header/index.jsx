import React from "react";
import HeaderHamburger from "./components/HeaderHamburger";
import HeaderLogo from "./components/HeaderLogo";
import HeaderAuth from "./components/HeaderAuth";

export const Header = () => {
  return (
    <header className="header --transparent">
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuth />
      </div>
    </header>
  );
};

import React from "react";
import { useMainContext } from "../../../context/MainContext";

const HeaderHamburger = () => {
  const { showNavBar, handleShowNavBar } = useMainContext();
  const _onClickShowNavBar = () => {
    $("body").toggleClass("menu-show");
    handleShowNavBar();
  };
  return (
    <div
      className={`header__humburger ${showNavBar ? "--close" : ""}`}
      onClick={_onClickShowNavBar}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
};

export default HeaderHamburger;

import React from "react";
import { useMainContext } from "../../context/MainContext";

export const Overlay = () => {
  const { handleShowNavBar } = useMainContext();
  const _onClickShowNavBar = () => {
    $("body").toggleClass("menu-show");
    handleShowNavBar();
  };
  return <div className="overlay" onClick={_onClickShowNavBar} />;
};

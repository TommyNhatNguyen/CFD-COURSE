import React, { useEffect, useState } from "react";
import HeaderHamburger from "./components/HeaderHamburger";
import HeaderLogo from "./components/HeaderLogo";
import HeaderAuth from "./components/HeaderAuth";
import { StyledHeader } from "../StyledComponents/StyledHeader";
import PATHS from "../../constants/paths";
import { useLocation } from "react-router-dom";
import { useMainContext } from "../../context/MainContext";

export const Header = () => {
  const { showNavBar } = useMainContext();
  const [isDropDown, setIsDropDown] = useState(false);
  const currentLocation = useLocation().pathname;
  // Change background
  const pathsChangeBg = [
    PATHS.COURSE.INDEX,
    PATHS.COURSE.ORDER,
    PATHS.BLOG.INDEX,
    PATHS.BLOG.DETAIL,
    PATHS.CONTACT,
    PATHS.PROFILE.INDEX,
    PATHS.PROFILE.MY_COURSE,
    PATHS.PROFILE.MY_PAYMENT,
    PATHS.PRIVACY,
    PATHS.PAYMENT,
  ];
  useEffect(() => {
    function setBgHeader(scrollY, className) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
        header.removeClass(className);
      } else {
        header.removeClass("--bgwhite");
        header.addClass(className);
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if (pathsChangeBg.includes(currentLocation)) {
        setBgHeader(scrollY, "--bgblackopacity");
      } else {
        setBgHeader(scrollY, "--transparent");
      }
      setIsDropDown(false);
    }
    window.addEventListener("scroll", scrollBgHeader);
    return () => window.removeEventListener("scroll", scrollBgHeader);
  }, [currentLocation]);
  // Handle Dropdown
  useEffect(() => {
    setIsDropDown?.(false);
    if (showNavBar) {
      setIsDropDown?.(false);
    }
  }, [currentLocation, showNavBar]);
  const handleShowDropDown = function (value) {
    setIsDropDown(value);
  };
  return (
    <StyledHeader
      className={`header ${
        pathsChangeBg.includes(currentLocation)
          ? "--bgblackopacity"
          : " --transparent"
      }`}
    >
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuth
          handleShowDropDown={handleShowDropDown}
          isDropDown={isDropDown}
        />
      </div>
    </StyledHeader>
  );
};

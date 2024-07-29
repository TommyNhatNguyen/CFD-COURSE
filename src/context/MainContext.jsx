import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const { pathname } = useLocation();

  const handleShowNavBar = (e) => {
    e?.stopPropagation();
    setShowNavBar((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowNavBar(false);
  }, [pathname]);

  return (
    <MainContext.Provider value={{ showNavBar, handleShowNavBar }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

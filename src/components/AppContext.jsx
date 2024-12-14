import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [screenLoad, setScreenLoad] = useState(false);
  const [en, setEn] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [en]);

  useEffect(() => {
    setScreenLoad(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setScreenLoad(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <AppContext.Provider
      value={{ loading, setLoading, en, setEn, notice, setNotice, screenLoad }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

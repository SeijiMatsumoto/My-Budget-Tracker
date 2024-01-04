"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MyNavigationContext = createContext();

export const MyNavigationProvider = ({ children }) => {
  const [page, setPage] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.length > 1) setPage(path.slice(1));
    else setPage("Dashboard");
  }, []);

  return (
    <MyNavigationContext.Provider
      value={{
        page,
        setPage,
        menuExpanded,
        setMenuExpanded,
      }}
    >
      {children}
    </MyNavigationContext.Provider>
  );
};

export const useMyNavigationContext = () => {
  return useContext(MyNavigationContext);
};

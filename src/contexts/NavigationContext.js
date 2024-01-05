"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MyNavigationContext = createContext();

export const MyNavigationProvider = ({ children }) => {
  const [page, setPage] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(
    localStorage.getItem("menuExpanded") || true
  );

  useEffect(() => {
    const path = window.location.pathname;
    if (path.length > 1 && !path.includes("login")) setPage(path.slice(1));
    else setPage("Dashboard");

    const expanded = localStorage.getItem("menuExpanded");
    if (expanded == "false") {
      setMenuExpanded(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("menuExpanded", menuExpanded);
  }, [menuExpanded]);

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

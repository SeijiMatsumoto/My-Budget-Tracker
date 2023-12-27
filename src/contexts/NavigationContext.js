"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MyNavigationContext = createContext();

export const MyNavigationProvider = ({ children }) => {
  const [page, setPage] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);

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
        newItemModalOpen,
        setNewItemModalOpen,
      }}
    >
      {children}
    </MyNavigationContext.Provider>
  );
};

export const useMyNavigationContext = () => {
  return useContext(MyNavigationContext);
};

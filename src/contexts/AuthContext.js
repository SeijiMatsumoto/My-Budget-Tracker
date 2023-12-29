"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MyAuthContext = createContext();

export const MyAuthProvider = ({ children }) => {
  return <MyAuthContext.Provider value={{}}>{children}</MyAuthContext.Provider>;
};

export const useMyAuthContext = () => {
  return useContext(MyAuthContext);
};

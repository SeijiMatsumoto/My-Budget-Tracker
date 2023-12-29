"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MySettingsContext = createContext();

export const MySettingsProvider = ({ children }) => {
  return (
    <MySettingsContext.Provider value={{}}>
      {children}
    </MySettingsContext.Provider>
  );
};

export const useMySettingsContext = () => {
  return useContext(MySettingsContext);
};

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const MySettingsContext = createContext();

export const MySettingsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([
    {
      title: "Needs",
      value: 50,
    },
    {
      title: "Wants",
      value: 30,
    },
    {
      title: "Savings",
      value: 20,
    },
  ]);

  return (
    <MySettingsContext.Provider value={{ budgets, setBudgets }}>
      {children}
    </MySettingsContext.Provider>
  );
};

export const useMySettingsContext = () => {
  return useContext(MySettingsContext);
};

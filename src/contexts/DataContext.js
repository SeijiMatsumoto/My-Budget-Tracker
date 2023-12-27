"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const MyDataContext = createContext();
import { transactions } from "@/data/transactions";

export const MyDataProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    setTransactionsData(
      transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  }, []);

  return (
    <MyDataContext.Provider
      value={{
        transactionsData,
        setTransactionsData,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export const useMyDataContext = () => {
  return useContext(MyDataContext);
};

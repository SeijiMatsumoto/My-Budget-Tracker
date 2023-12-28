"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const MyDataContext = createContext();
import { transactions } from "@/data/transactions";

export const MyDataProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [sortedData, setSortedData] = useState(transactionsData);

  useEffect(() => {
    const sorted = transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setTransactionsData(sorted);
    setSortedData(sorted);
  }, []);

  return (
    <MyDataContext.Provider
      value={{
        transactionsData,
        setTransactionsData,
        sortedData,
        setSortedData,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export const useMyDataContext = () => {
  return useContext(MyDataContext);
};

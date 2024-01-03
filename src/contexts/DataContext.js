"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
const MyDataContext = createContext();
import { transactions } from "@/data/dummyData/transactions";

export const MyDataProvider = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const currentDate = new Date();
  const [startDate, setStartDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  );
  const [searchInput, setInput] = useState({ input: "", type: "title" });
  const [type, setType] = useState("All");
  const [budgetType, setBudgetType] = useState("All");

  const [savedAmount, setSavedAmount] = useState(0.0);
  const [spentAmount, setSpentAmount] = useState(0.0);
  const [incomeAmount, setIncomeAmount] = useState(0.0);
  const [totalNet, setTotalNet] = useState(0.0);

  useEffect(() => {
    const sorted = transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setTransactionsData(sorted);
  }, []);

  useEffect(() => {
    const filteredRangeData = filterRange(transactionsData, startDate, endDate);
    setSortedData(filteredRangeData || []);
  }, [transactionsData]);

  const handleSort = (sortConfig, setSortConfig, key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortByKey = (a, b, key) => {
    if (key === "amount") {
      return a[key] - b[key];
    }
    return a[key] > b[key] ? 1 : -1;
  };

  const filterRange = (data, startDate, endDate) => {
    return data.filter((transaction) => {
      const parts = transaction.date.split("-");
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);

      const dateObject = new Date(year, month, day);
      return dateObject >= startDate && dateObject <= endDate;
    });
  };

  const getTotalAmount = (type) => {
    const transactionsOfType = sortedData.filter(
      (transaction) => transaction.type === type
    );

    if (transactionsOfType.length > 0) {
      const sum = transactionsOfType.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      return sum;
    }

    return 0;
  };

  return (
    <MyDataContext.Provider
      value={{
        transactionsData,
        setTransactionsData,
        sortedData,
        setSortedData,
        handleSort,
        sortByKey,
        filterRange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchInput,
        setInput,
        type,
        setType,
        savedAmount,
        setSavedAmount,
        spentAmount,
        setSpentAmount,
        incomeAmount,
        setIncomeAmount,
        totalNet,
        setTotalNet,
        getTotalAmount,
        budgetType,
        setBudgetType,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export const useMyDataContext = () => {
  return useContext(MyDataContext);
};

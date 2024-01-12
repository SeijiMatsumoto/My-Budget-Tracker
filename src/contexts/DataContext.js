"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "../../firebase";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getDataFromFirestore } from "@/data/useFirebase";
import { returnToast } from "@/utils/returnToast";
import { useToast } from "@chakra-ui/react";

const MyDataContext = createContext();

export const MyDataProvider = ({ children }) => {
  const toast = useToast();
  const { user, loading } = useAuth();

  const [dataToShow, setdataToShow] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [budgetsData, setBudgetsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [recurringData, setRecurringData] = useState([]);

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [startDate, setStartDate] = useState(new Date(firstDayOfMonth));
  const [endDate, setEndDate] = useState(new Date(lastDayOfMonth));
  const [rangeType, setRangeType] = useState("Month");
  const [searchInput, setSearchInput] = useState("");
  const [type, setType] = useState("All");
  const [budgetType, setBudgetType] = useState("All");

  const [savedAmount, setSavedAmount] = useState(0.0);
  const [spentAmount, setSpentAmount] = useState(0.0);
  const [incomeAmount, setIncomeAmount] = useState(0.0);
  const [totalNet, setTotalNet] = useState(0.0);

  useEffect(() => {
    const filteredRangeData = filterRange(transactionsData, startDate, endDate);
    setdataToShow(filteredRangeData || []);

    const currentMonth = filterRange(
      transactionsData,
      firstDayOfMonth,
      lastDayOfMonth
    );

    setCurrentMonthData(currentMonth);
  }, [transactionsData]);

  useEffect(() => {
    if (user)
      getDataFromFirestore(
        user,
        setTransactionsData,
        setBudgetsData,
        setCategoriesData,
        returnToast,
        toast
      );
  }, [user]);

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
    const transactionsOfType = dataToShow.filter(
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
        dataToShow,
        setdataToShow,
        handleSort,
        sortByKey,
        filterRange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        searchInput,
        setSearchInput,
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
        budgetsData,
        setBudgetsData,
        categoriesData,
        setCategoriesData,
        rangeType,
        setRangeType,
        currentMonthData,
        recurringData,
        setRecurringData,
      }}
    >
      {children}
    </MyDataContext.Provider>
  );
};

export const useMyDataContext = () => {
  return useContext(MyDataContext);
};

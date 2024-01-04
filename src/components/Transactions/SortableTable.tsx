"use client"
import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import { useMyDataContext } from '@/contexts/DataContext';
import TableItem from './TableItem';

type Props = {
  sortConfig: SortConfig
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}

interface SortConfig {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
}

const SortableTable = ({ sortConfig }: Props) => {
  const { transactionsData, sortedData, setSortedData, sortByKey, filterRange, startDate, endDate, searchInput, type, budgetType } = useMyDataContext();

  useEffect(() => {
    setSortedData([...sortedData].sort((a, b) => {
      return sortConfig.direction === 'asc' ?
        sortByKey(a, b, sortConfig.key as keyof Transaction)
        : sortByKey(b, a, sortConfig.key as keyof Transaction);
    }
    ))
  }, [sortConfig])

  useEffect(() => {
    const filteredData = filterRange(transactionsData, startDate, endDate);
    setSortedData(filteredData);
  }, [startDate, endDate])

  useEffect(() => {
    if (searchInput.input.length) {
      const searchOutput = transactionsData.filter((transaction: Transaction) => searchInput.type === "title" ? transaction.title.toLowerCase().includes(searchInput.input) : transaction.category.toLowerCase().includes(searchInput.input));
      setSortedData(filterRange(searchOutput, startDate, endDate));
    } else {
      setSortedData(filterRange(transactionsData, startDate, endDate));
    }
  }, [searchInput])

  useEffect(() => {
    if (type === "All") {
      setSortedData(filterRange(transactionsData, startDate, endDate))
    } else {
      const searchOutput = transactionsData.filter((transaction: Transaction) => transaction.type === type);
      setSortedData(filterRange(searchOutput, startDate, endDate));
    }
  }, [type])

  useEffect(() => {
    if (budgetType === "All") {
      setSortedData(filterRange(transactionsData, startDate, endDate))
    } else {
      const searchOutput = transactionsData.filter((transaction: Transaction) => transaction.budget === budgetType);
      setSortedData(filterRange(searchOutput, startDate, endDate));
    }
  }, [budgetType])

  return (
    <Box className={styles.tableWrapper}>
      {sortedData.length ? sortedData.map((row: Transaction, i: number) => {
        return (
          <TableItem key={row.title + i} data={row} index={i} />
        )
      }) : <Text>There are no transactions recorded yet.</Text>}
    </Box>
  )
}

export default SortableTable
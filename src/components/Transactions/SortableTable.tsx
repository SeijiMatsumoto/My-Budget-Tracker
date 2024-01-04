"use client"
import React, { useEffect } from 'react'
import {
  Box,
  CardBody,
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
  const { transactionsData, dataToShow, setdataToShow, sortByKey, filterRange, startDate, endDate, searchInput, type, budgetType } = useMyDataContext();

  useEffect(() => {
    setdataToShow([...dataToShow].sort((a, b) => {
      return sortConfig.direction === 'asc' ?
        sortByKey(a, b, sortConfig.key as keyof Transaction)
        : sortByKey(b, a, sortConfig.key as keyof Transaction);
    }
    ))
  }, [sortConfig])

  useEffect(() => {
    const filteredData = filterRange(transactionsData, startDate, endDate);
    setdataToShow(filteredData);
  }, [startDate, endDate])

  useEffect(() => {
    if (searchInput.length) {
      const searchOutput =
        transactionsData.filter((transaction: Transaction) =>
          transaction.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchInput.toLowerCase()));
      setdataToShow(filterRange(searchOutput, startDate, endDate));
    } else {
      setdataToShow(filterRange(transactionsData, startDate, endDate));
    }
  }, [searchInput])

  useEffect(() => {
    if (type === "All") {
      setdataToShow(filterRange(transactionsData, startDate, endDate))
    } else {
      const searchOutput = transactionsData.filter((transaction: Transaction) => transaction.type === type);
      setdataToShow(filterRange(searchOutput, startDate, endDate));
    }
  }, [type])

  useEffect(() => {
    if (budgetType === "All") {
      setdataToShow(filterRange(transactionsData, startDate, endDate))
    } else {
      const searchOutput = transactionsData.filter((transaction: Transaction) => transaction.budget === budgetType);
      setdataToShow(filterRange(searchOutput, startDate, endDate));
    }
  }, [budgetType])

  return (
    <CardBody overflow="scroll" className={styles.cardBody} pt={0}>
      <Box className={styles.tableWrapper}>
        {dataToShow.length ? dataToShow.map((row: Transaction, i: number) => {
          return (
            <TableItem key={row.title + i} data={row} index={i} />
          )
        }) : <Text>There are no transactions recorded yet.</Text>}
      </Box>
    </CardBody>
  )
}

export default SortableTable
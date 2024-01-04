"use client"
import React, { useEffect, useState } from 'react'
import {
  Box, Text,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import { useMyDataContext } from '@/contexts/DataContext';
import TableItem from './TableItem';

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

const SortableTable = () => {
  const { transactionsData, sortedData, setSortedData, handleSort, sortByKey, filterRange, startDate, endDate, searchInput, type, budgetType } = useMyDataContext();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

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
    // <TableContainer>
    //   <Table variant="striped" size="sm">
    //     <Thead>
    //       <Tr>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'type')}>Type</Th>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'title')}>Title</Th>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'budget')}>Budget</Th>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'category')}>Category</Th>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'date')}>Date</Th>
    //         <Th className={styles.colHeader} onClick={() => handleSort(sortConfig, setSortConfig, 'amount')}>Amount</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {sortedData.map((row: Transaction, i: number) => {
    //         return (
    //           <Tr key={row.title + i}>
    //             <Td>{row.type}</Td>
    //             <Td>{row.title}</Td>
    //             <Td>{row.budget}</Td>
    //             <Td>{row.category}</Td>
    //             <Td>{row.date}</Td>
    //             <Td>{convertDollarsToString(row.amount)}</Td>
    //           </Tr>
    //         )
    //       })}
    //     </Tbody>
    //     <Tfoot>
    //       <Tr>
    //         <Th>Total</Th>
    //         <Th />
    //         <Th />
    //         <Th />
    //         <Th />
    //         <Th >${sortedData.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0).toFixed(2) * -1}</Th>
    //       </Tr>
    //     </Tfoot>
    //     <TableCaption>All Transactions from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}</TableCaption>
    //   </Table>
    // </TableContainer>
  )
}

export default SortableTable
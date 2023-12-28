"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tfoot,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import { useMyDataContext } from '@/contexts/DataContext';

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

interface SortConfig {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
}

interface Props {
  startDate: Date;
  endDate: Date;
  searchInput: {
    input: string;
    type: string;
  };
  type: string;
}

const SortableTable = ({ startDate, endDate, searchInput, type }: Props) => {
  const { transactionsData, sortedData, setSortedData } = useMyDataContext();

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortByKey = (a: Transaction, b: Transaction, key: keyof Transaction) => {
    if (key === 'amount') {
      return a[key] - b[key];
    }
    return a[key] > b[key] ? 1 : -1;
  };

  useEffect(() => {
    setSortedData([...sortedData].sort((a, b) => {
      return sortConfig.direction === 'asc' ?
        sortByKey(a, b, sortConfig.key as keyof Transaction)
        : sortByKey(b, a, sortConfig.key as keyof Transaction);
    }
    ))
  }, [sortConfig])

  const filterRange = (data: Transaction[]) => {
    return data.filter((transaction: Transaction) => {
      const parts = transaction.date.split('-');
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);

      const dateObject = new Date(year, month, day);
      return dateObject >= startDate && dateObject <= endDate;
    })
  }

  useEffect(() => {
    const filteredData = filterRange(transactionsData);
    setSortedData(filteredData);
  }, [startDate, endDate])

  useEffect(() => {
    if (searchInput.input.length) {
      const searchOutput = transactionsData.filter((transaction: Transaction) => searchInput.type === "title" ? transaction.title.toLowerCase().includes(searchInput.input) : transaction.category.toLowerCase().includes(searchInput.input));
      setSortedData(filterRange(searchOutput));
    } else {
      setSortedData(filterRange(transactionsData));
    }
  }, [searchInput])

  useEffect(() => {
    if (type === "All") {
      setSortedData(filterRange(transactionsData))
    } else {
      const searchOutput = transactionsData.filter((transaction: Transaction) => transaction.type === type);
      setSortedData(filterRange(searchOutput));
    }
  }, [type])

  const convertDollarsToString = (amount: number) => {
    if (amount < 0) {
      return `-$${amount.toFixed(2).toString().slice(1)}`
    } else {
      return `+$${amount.toFixed(2)}`
    }
  }

  return (
    <TableContainer>
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            <Th className={styles.colHeader} onClick={() => handleSort('title')}>Title</Th>
            <Th className={styles.colHeader} onClick={() => handleSort('type')}>Type</Th>
            <Th className={styles.colHeader} onClick={() => handleSort('category')}>Category</Th>
            <Th className={styles.colHeader} onClick={() => handleSort('date')}>Date</Th>
            <Th className={styles.colHeader} onClick={() => handleSort('amount')}>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((row: Transaction, i: number) => {
            return (
              <Tr key={row.title + i}>
                <Td>{row.title}</Td>
                <Td>{row.type}</Td>
                <Td>{row.category}</Td>
                <Td>{row.date}</Td>
                <Td>{convertDollarsToString(row.amount)}</Td>
              </Tr>
            )
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th />
            <Th />
            <Th />
            <Th >${sortedData.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0).toFixed(2)}</Th>
          </Tr>
        </Tfoot>
        <TableCaption>All Transactions</TableCaption>
      </Table>
    </TableContainer>
  )
}

export default SortableTable
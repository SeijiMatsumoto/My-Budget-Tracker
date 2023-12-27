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
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import { transactions } from '@/data/transactions'

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
}

const SortableTable = ({ startDate, endDate, searchInput }: Props) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [sortedData, setSortedData] = useState(transactions);

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
    const filteredData = filterRange(transactions);
    setSortedData(filteredData);
  }, [startDate, endDate])

  useEffect(() => {
    if (searchInput.input.length) {
      const searchOutput = transactions.filter(transaction => searchInput.type === "title" ? transaction.title.toLowerCase().includes(searchInput.input) : transaction.category.toLowerCase().includes(searchInput.input));
      setSortedData(filterRange(searchOutput));
    } else {
      setSortedData(filterRange(transactions));
    }
  }, [searchInput])

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
          {sortedData.map((row, i) => {
            return (
              <Tr key={row.title + i}>
                <Td>{row.title}</Td>
                <Td>{row.type}</Td>
                <Td>{row.category}</Td>
                <Td>{row.date}</Td>
                {row.type === "Transaction" ? <Td>-${row.amount.toFixed(2)}</Td> : <Td>+${row.amount.toFixed(2)}</Td>}
              </Tr>
            )
          })}
        </Tbody>
        <TableCaption>All Transactions</TableCaption>
      </Table>
    </TableContainer>
  )
}

export default SortableTable
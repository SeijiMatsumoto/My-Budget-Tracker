"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  Flex,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import SortableTable from './SortableTable'
import Overview from './Overview'
import { useMyDataContext } from '@/contexts/DataContext';
import Filters from './Filters'

interface SortConfig {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
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

function Transactions() {
  const { startDate, endDate, setEndDate } = useMyDataContext();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  useEffect(() => {
    if (startDate > endDate) {
      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(startDate.getDate() + 7);
      setEndDate(oneWeekLater);
    }
  }, [startDate])

  return (
    <Flex justifyContent="space-between" height="100%" flexDir="column">
      <Overview />
      <Flex flexDir="row" height="80%">
        <Card flexDir="column" width="100%" className={styles.tableWrapper}>
          <Filters sortConfig={sortConfig} setSortConfig={setSortConfig} />
          <SortableTable sortConfig={sortConfig} />
        </Card>
      </Flex>
    </Flex >
  )
}

export default Transactions
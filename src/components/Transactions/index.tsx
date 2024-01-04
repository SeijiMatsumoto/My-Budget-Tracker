"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Flex,
  Heading,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import SortableTable from './SortableTable'
import Filters from './Filters'
import Overview from './Overview'
import { useMyDataContext } from '@/contexts/DataContext';
import SortButton from './SortButton'
import Search from './Filters/Search'

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
  const { startDate, endDate, setEndDate, handleSort } = useMyDataContext();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  useEffect(() => {
    if (startDate > endDate) {
      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(startDate.getDate() + 7);
      setEndDate(oneWeekLater);
    }
  }, [startDate])

  const convertRange = () => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    return `${formattedStartDate} to ${formattedEndDate}`;
  }

  return (
    <Flex justifyContent="space-between" height="100%" flexDir="column">
      <Overview />
      <Flex flexDir="row" height="80%">
        <Card flexDir="column" width="75%" mr={5} className={styles.tableWrapper}>
          <CardHeader justifyContent="space-between" display="flex" flexDir="row">
            <Heading size="md">{convertRange()}</Heading>
            <Flex>
              <Search />
              <SortButton sortConfig={sortConfig} setSortConfig={setSortConfig} handleSort={handleSort} />
            </Flex>
          </CardHeader>
          <SortableTable sortConfig={sortConfig} />
        </Card>
        <Flex width="25%" flexDir="column" className={styles.filterWrapper}>
          <Filters />
        </Flex>
      </Flex>
    </Flex >
  )
}

export default Transactions
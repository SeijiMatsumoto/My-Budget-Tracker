"use client"
import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import SortableTable from './SortableTable'
import Filters from './Filters'
import Overview from './Overview'
import { useMyDataContext } from '@/contexts/DataContext';
import { FaChevronDown } from "react-icons/fa";

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
  const [sortType, setSortType] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  useEffect(() => {
    if (startDate > endDate) {
      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(startDate.getDate() + 7);
      setEndDate(oneWeekLater);
    }
  }, [startDate])

  const sortAction = (type: string) => {
    handleSort(sortConfig, setSortConfig, type);
    setSortType(type[0].toUpperCase() + type.slice(1));
  }

  const convertRange = () => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);
    const formattedEndDate = endDate.toLocaleDateString('en-US', options);

    return `${formattedStartDate} to ${formattedEndDate}`;
  }

  return (
    <Flex justifyContent="space-between" height="100%">
      <Card flexDir="column" width="75%" mr={5} className={styles.tableWrapper}>
        <CardHeader justifyContent="space-between" display="flex" flexDir="row">
          <Heading size="md">{convertRange()}</Heading>
          <Box mb={3} display="flex" justifyContent="flex-end">
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                {sortType ? `Sort by ${sortType}` : "Sort"}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => sortAction("amount")}>Amount</MenuItem>
                <MenuItem onClick={() => sortAction('date')}>Date</MenuItem>
                <MenuItem onClick={() => sortAction('title')}>Title</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </CardHeader>
        <CardBody overflow="scroll" className={styles.cardBody} pt={0}>
          <SortableTable sortConfig={sortConfig} />
        </CardBody>
      </Card>
      <Flex width="25%" flexDir="column" className={styles.filterWrapper}>
        <Card mb={5} height="30%" >
          <CardHeader>
            <Heading size="md">Overview</Heading>
          </CardHeader>
          <CardBody className={styles.cardBody} paddingTop={0}>
            <Overview />
          </CardBody>
        </Card>
        <Card height="70%">
          <CardHeader>
            <Heading size="md">Filters and Options</Heading>
          </CardHeader>
          <CardBody className={styles.cardBody}>
            <Filters />
          </CardBody>
        </Card>
      </Flex>
    </Flex >
  )
}

export default Transactions
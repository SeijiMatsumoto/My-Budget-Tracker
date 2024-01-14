"use client"
import React, { useEffect, useState } from 'react'
import {
  Box,
  CardBody,
  Flex,
  Heading,
  Switch,
  Text,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import styles2 from '@/styles/Transactions/sortableTable.module.scss'
import { useMyDataContext } from '@/contexts/DataContext';
import TableItem from './TableItem';
import useLocalStorage from '@/hooks/useLocalStorage'

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
  tags: string[];
}

interface SortConfig {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
}

interface DataByDate {
  date: string;
  transactions: Transaction[];
}

const SortableTable = ({ sortConfig }: Props) => {
  const { transactionsData, dataToShow, setdataToShow, sortByKey, filterRange, startDate, endDate, searchInput, type, budgetType } = useMyDataContext();
  const [dataByDate, setDataByDate] = useState<DataByDate[]>([]);
  const [isCondensed, setStoredValue] = useLocalStorage<any>('isCondensed', false);

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
          transaction.category.toLowerCase().includes(searchInput.toLowerCase()) ||
          (transaction.tags && transaction.tags.find(tag => tag.toLowerCase().includes(searchInput.toLowerCase()))));
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

  useEffect(() => {
    if (dataToShow.length) {
      const separatedByDate = dataToShow.reduce((acc: any, transaction: Transaction) => {
        const transactionDate = transaction.date;
        const existingEntry = acc.find((entry: Transaction) => entry.date === transactionDate);

        if (existingEntry) {
          existingEntry.transactions.push(transaction);
        } else {
          acc.push({
            date: transactionDate,
            transactions: [transaction]
          });
        }

        return acc;
      }, []);

      console.log(separatedByDate);
      setDataByDate(separatedByDate);
    }

  }, [dataToShow])

  const handleUpdate = () => {
    setStoredValue(!isCondensed)
  }

  const convertDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    const formattedDate = new Date(`${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[formattedDate.getDay()];
    const month = monthsOfYear[formattedDate.getMonth()];

    const formattedDateString = `${month} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
    return {
      dayOfWeek: dayOfWeek,
      formattedDate: formattedDateString
    };
  }

  return (
    <CardBody overflow="scroll" className={styles.cardBody} pt={0}>
      <Flex>
        <Text fontSize="12px" mr={1} mb={2}>Condensed</Text>
        <Switch size='sm' isChecked={isCondensed} onChange={handleUpdate} />
      </Flex>
      <Box className={styles.tableWrapper}>
        {dataByDate.length ? dataByDate.map((eachDay: DataByDate, i: number) => {
          const formattedDate = convertDate(eachDay.date);
          const inputDate = new Date(eachDay.date);
          const upcoming = inputDate > new Date();
          return (
            <Flex flexDir="column" key={eachDay.date + i}>
              <Flex className={styles.dateWrapper} padding={isCondensed ? 2 : 3}>
                {upcoming && <span>Upcoming</span>}
                <Text fontWeight="bold">{`${formattedDate.dayOfWeek}, ${formattedDate.formattedDate}`}</Text>
              </Flex>
              {eachDay.transactions.map((transaction: Transaction) => {
                return (
                  <TableItem data={transaction} index={i} isCondensed={isCondensed} convertDate={convertDate} />
                )
              })}
            </Flex>
          )
        }) : <Text>There are no transactions recorded yet.</Text>}
      </Box>
    </CardBody>
  )
}

export default SortableTable
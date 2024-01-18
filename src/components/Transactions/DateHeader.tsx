"use client"
import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import styles from '@/styles/Transactions/sortableTable.module.scss'

type Props = {
  isCondensed: boolean;
  convertDate: Function;
  eachDay: DataByDate;
  isFirstUpcoming: boolean;
  setIsFirstUpcoming: Function;
}

interface DataByDate {
  date: string;
  transactions: Transaction[];
  totalAmount: number;
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


const DateHeader = ({ isCondensed, convertDate, eachDay }: Props) => {
  const formattedDate = convertDate(eachDay.date);
  const inputDate = new Date(eachDay.date);
  const upcoming = inputDate > new Date();

  return (
    <Box className={styles.dateWrapper} padding={isCondensed ? '5px 20px' : '20px'} width="100%">
      <Flex alignItems="center" width="92%">
        <Box mr={5} display="flex" flexDir="column" justifyContent="center" width="10%">
          {upcoming && <Text fontWeight="bold">Upcoming</Text>}
          {!upcoming && <Text fontWeight="bold">{`${formattedDate.dayOfWeek}, ${formattedDate.formattedDate}`}</Text>}
        </Box>
        <Box mr={5} width="25%" />
        <Box mr={5} width="15%" />
        <Box width="15%" />
        <Box width="35%" />
      </Flex>
      <Flex width="8%">
        {!upcoming && <Text color={eachDay.totalAmount > 0 ? 'rgb(37, 123, 159)' : 'rgb(182, 0, 0)'}>${eachDay.totalAmount.toFixed(2)}</Text>}
      </Flex>
    </Box>)
}

export default DateHeader
"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
} from '@chakra-ui/react'
import styles from '@/styles/Transactions/transactions.module.scss'
import SortableTable from './SortableTable'
import Filters from './Filters'

interface Search {
  input: string;
  type: string;
}

function Transactions() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [endDate, setEndDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
  const [searchInput, setInput] = useState<Search>({ input: "", type: "title" });

  useEffect(() => {
    if (startDate > endDate) {
      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(startDate.getDate() + 7);
      setEndDate(oneWeekLater);
    }
  }, [startDate])

  return (
    <Flex justifyContent={"space-between"} height="100%">
      <Card flexDir="column" width="80%">
        <CardHeader>
          <Heading size="md">Transactions</Heading>
        </CardHeader>
        <CardBody overflow="scroll" className={styles.cardBody}>
          <SortableTable startDate={startDate} endDate={endDate} searchInput={searchInput} />
        </CardBody>
      </Card>
      <Card width="19%">
        <CardHeader>
          <Heading size="md">Filters and Options</Heading>
        </CardHeader>
        <CardBody overflow="scroll" className={styles.cardBody}>
          <Filters
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            searchInput={searchInput}
            setInput={setInput}
          />
        </CardBody>
      </Card>
    </Flex >
  )
}

export default Transactions
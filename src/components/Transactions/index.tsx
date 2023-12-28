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
import Overview from './Overview'

interface Search {
  input: string;
  type: string;
}

function Transactions() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [endDate, setEndDate] = useState<Date>(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));
  const [searchInput, setInput] = useState<Search>({ input: "", type: "title" });
  const [type, setType] = useState<string>("All");

  useEffect(() => {
    if (startDate > endDate) {
      const oneWeekLater = new Date(startDate);
      oneWeekLater.setDate(startDate.getDate() + 7);
      setEndDate(oneWeekLater);
    }
  }, [startDate])

  return (
    <Flex justifyContent={"space-between"} height="100%">
      <Card flexDir="column" width="75%">
        <CardHeader justifyContent="space-between" display="flex" flexDir="row">
          <Heading size="md">Transactions</Heading>
          <Heading size="md">{startDate.toDateString()} - {endDate.toDateString()}</Heading>
        </CardHeader>
        <CardBody overflow="scroll" className={styles.cardBody}>
          <SortableTable startDate={startDate} endDate={endDate} searchInput={searchInput} type={type} />
        </CardBody>
      </Card>
      <Flex width="24%" flexDir="column">
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
            <Filters
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              searchInput={searchInput}
              setInput={setInput}
              type={type}
              setType={setType}
            />
          </CardBody>
        </Card>
      </Flex>
    </Flex >
  )
}

export default Transactions
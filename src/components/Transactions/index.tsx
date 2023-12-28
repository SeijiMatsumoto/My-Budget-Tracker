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
import { useMyDataContext } from '@/contexts/DataContext';

function Transactions() {
  const { startDate, endDate, setEndDate } = useMyDataContext();

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
          <SortableTable />
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
            <Filters />
          </CardBody>
        </Card>
      </Flex>
    </Flex >
  )
}

export default Transactions
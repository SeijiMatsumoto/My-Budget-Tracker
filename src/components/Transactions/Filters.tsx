"use client";
import React from 'react'
import DateRange from './Filters/DateRange'
import { Box, Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';
import Type from './Filters/Type';
import Budget from './Filters/Budget';
import styles from '@/styles/Transactions/transactions.module.scss'

const Filters = () => {

  return (
    <Card height="100%">
      <CardHeader>
        <Heading size="md">Filters</Heading>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <Flex flexDir="column">
          <Box mb={10}>
            <Heading size="xs" mb={3}>Date Range</Heading>
            <DateRange />
          </Box>
          <Box mb={10} display="flex" flexDir="row">
            <Box mr={5} width="50%">
              <Heading size="xs" mb={3}>Expense Type</Heading>
              <Type />
            </Box>
            <Box width="50%">
              <Heading size="xs" mb={3}>Budget Type</Heading>
              <Budget />
            </Box>
          </Box>

        </Flex>
      </CardBody>
    </Card>
  )
}

export default Filters
"use client"
import { Box, Flex, Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';
import AnimatedNumber from '@crossfox/react-animated-number';
import styles from '@/styles/Transactions/transactions.module.scss'

const Overview = () => {
  const { dataToShow, savedAmount, setSavedAmount, spentAmount, setSpentAmount, incomeAmount, setIncomeAmount, totalNet, setTotalNet, getTotalAmount } = useMyDataContext();

  useEffect(() => {
    if (dataToShow && dataToShow.length) {
      const totalSavings = getTotalAmount("Savings") * -1;
      const totalSpent = getTotalAmount("Transaction") * -1;
      const totalIncome = getTotalAmount("Income");
      setSavedAmount(totalSavings);
      setSpentAmount(totalSpent);
      setIncomeAmount(totalIncome);
      setTotalNet(totalIncome - totalSavings - totalSpent);
    }
  }, [dataToShow])

  return (
    <Card mb={5} height="20%" >
      <CardHeader>
        <Heading size="md">Overview</Heading>
      </CardHeader>
      <CardBody className={styles.cardBody} paddingTop={0}>
        <Flex flexDir="column" alignItems="center" justifyContent="space-evenly" height="100%">
          <Flex width="100%" flexDir="row" justifyContent="space-evenly" className={styles.overviewGrid}>
            <Box textAlign="center">
              <AnimatedNumber prefix="$" round={2} value={parseFloat(incomeAmount.toFixed(2))} className={styles.amount} />
              <Heading size="sm" textAlign="center">Amount of Income</Heading>
            </Box>
            <Box textAlign="center">
              <AnimatedNumber prefix="$" round={2} value={parseFloat(savedAmount.toFixed(2))} className={styles.amount} />
              <Heading size="sm" textAlign="center">Amount Saved</Heading>
            </Box>
            <Box textAlign="center">
              <AnimatedNumber prefix="$" round={2} value={parseFloat(spentAmount.toFixed(2))} className={styles.amount} />
              <Heading size="sm" textAlign="center">Amount Spent</Heading>
            </Box>
            <Box textAlign="center">
              <AnimatedNumber prefix="$" round={2} value={parseFloat(totalNet.toFixed(2))} className={styles.amount} />
              <Heading size="sm" textAlign="center">Total Remaining</Heading>
            </Box>
          </Flex>
        </Flex>    </CardBody>
    </Card>

  )
}

export default Overview
"use client"
import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';
import AnimatedNumber from '@crossfox/react-animated-number';
import styles from '@/styles/Transactions/transactions.module.scss'

const Overview = () => {
  const { sortedData, savedAmount, setSavedAmount, spentAmount, setSpentAmount, incomeAmount, setIncomeAmount, totalNet, setTotalNet, getTotalAmount } = useMyDataContext();

  useEffect(() => {
    if (sortedData.length) {
      const totalSavings = getTotalAmount("Savings") * -1;
      const totalSpent = getTotalAmount("Transaction") * -1;
      const totalIncome = getTotalAmount("Income");
      setSavedAmount(totalSavings);
      setSpentAmount(totalSpent);
      setIncomeAmount(totalIncome);
      setTotalNet(totalIncome - totalSavings - totalSpent);
    }
  }, [sortedData])

  return (
    <Flex flexDir="column" alignItems="center" justifyContent="space-evenly" height="100%">
      <Grid width="100%" gridTemplateColumns={'1fr 1fr'} gridGap={8} className={styles.overviewGrid}>
        <Box textAlign="center">
          <AnimatedNumber prefix="$" round={2} value={parseFloat(incomeAmount.toFixed(2))} className={styles.amount} />
          <Heading size="sm">Amount of Income</Heading>
        </Box>
        <Box textAlign="center">
          <AnimatedNumber prefix="$" round={2} value={parseFloat(savedAmount.toFixed(2))} className={styles.amount} />
          <Heading size="sm">Amount Saved</Heading>
        </Box>
        <Box textAlign="center">
          <AnimatedNumber prefix="$" round={2} value={parseFloat(spentAmount.toFixed(2))} className={styles.amount} />
          <Heading size="sm">Amount Spent</Heading>
        </Box>
        <Box textAlign="center">
          <AnimatedNumber prefix="$" round={2} value={parseFloat(totalNet.toFixed(2))} className={styles.amount} />
          <Heading size="sm">Total Remaining</Heading>
        </Box>
      </Grid>
    </Flex>
  )
}

export default Overview
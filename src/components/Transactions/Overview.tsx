"use client"
import { Box, Flex, Grid, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';
import AnimatedNumber from '@crossfox/react-animated-number';
import styles from '@/styles/Transactions/transactions.module.scss'

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

const Overview = () => {
  const { sortedData } = useMyDataContext();
  const [savedAmount, setSavedAmount] = useState<number>(0.00);
  const [spentAmount, setSpentAmount] = useState<number>(0.00);
  const [incomeAmount, setIncomeAmount] = useState<number>(0.00);
  const [totalNet, setTotalNet] = useState<number>(0.00);

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

  const getTotalAmount = (type: string) => {
    const temp = sortedData.filter((transaction: Transaction) => transaction.type === type)
    if (temp.length) {
      const sum = temp.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0);
      return sum;
    } else {
      return 0;
    }
  }

  return (
    <Flex flexDir="column" alignItems="center" justifyContent="space-evenly" height="100%">
      <Grid width="100%" gridTemplateColumns={'1fr 1fr'} gridGap={10}>
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
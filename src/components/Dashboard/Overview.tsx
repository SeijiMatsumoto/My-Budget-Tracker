"use client"
import React, { useEffect } from 'react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { useMyDataContext } from '@/contexts/DataContext';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Box,
  Flex,
  Grid
} from '@chakra-ui/react';
import { userData } from '@/data/dummyData/user';
import AnimatedNumber from '@crossfox/react-animated-number';

const Overview = () => {
  const { sortedData, savedAmount, setSavedAmount, spentAmount, setSpentAmount, incomeAmount, setIncomeAmount, totalNet, setTotalNet, getTotalAmount } = useMyDataContext();

  const date = new Date();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysLeft = Math.ceil((lastDayOfMonth.valueOf() - date.valueOf()) / (1000 * 60 * 60 * 24));

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

  const getMessage = () => {
    if (totalNet < 0) {
      return <Text>You overspent this month!</Text>
    } else if (totalNet < 500) {
      return <Text>You are almost running out.</Text>
    } else if (totalNet < 1500) {
      return <Text>Keep it up!</Text>
    } else {
      return <Text>You have a lot left to spend this month!</Text>
    }
  }

  return (
    <Flex height="100%" mr={5} width={'15%'} flexDir="column">
      <Card className={styles.smallCard} mb={5}>
        <CardHeader>
          <Heading size="md">Hello, {userData.fullName.split(" ")[0]}!</Heading>
        </CardHeader>
        <CardBody>
          <Flex flexDir="column" height="100%" justifyContent="space-between">
            <Grid width="100%" gridTemplateColumns={'1fr'} gridGap={2}>
              <Box textAlign="center">
                <Heading size="sm">Income</Heading>
                <AnimatedNumber prefix="$" round={2} value={parseFloat(incomeAmount.toFixed(2))} className={styles.amount} />
              </Box>
              <Box textAlign="center">
                <Heading size="sm">Saved</Heading>
                <AnimatedNumber prefix="$" round={2} value={parseFloat(savedAmount.toFixed(2))} className={styles.amount} />
              </Box>
              <Box textAlign="center">
                <Heading size="sm">Spent</Heading>
                <AnimatedNumber prefix="$" round={2} value={parseFloat(spentAmount.toFixed(2))} className={styles.amount} />
              </Box>
              <Box textAlign="center">
                <Heading size="sm">Total Remaining</Heading>
                <AnimatedNumber prefix="$" round={2} value={parseFloat(totalNet.toFixed(2))} className={styles.amount} />
              </Box>
            </Grid>
            <Box className={styles.message}>
              {sortedData.length && getMessage()}
            </Box>
          </Flex>
        </CardBody>
      </Card>
      <Card className={styles.calendar}>
        <Box className={styles.month}>{month}</Box>
        <Box className={styles.day}>{date.getDate()}</Box>
        <Text className={styles.text}>Days Left: {daysLeft}</Text>
      </Card>
    </Flex>
  )
}

export default Overview
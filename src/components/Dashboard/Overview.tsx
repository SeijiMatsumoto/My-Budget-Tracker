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
  Flex
} from '@chakra-ui/react';
import AnimatedNumber from '@crossfox/react-animated-number';
import { useAuth } from '@/contexts/AuthContext';
import useIsMobile from '@/hooks/useIsMobile';

const Overview = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { currentMonthData, setSavedAmount, setSpentAmount, setIncomeAmount, totalNet, setTotalNet, getTotalAmount } = useMyDataContext();

  const date = new Date();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysLeft = Math.ceil((lastDayOfMonth.valueOf() - date.valueOf()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (currentMonthData.length) {
      const totalSavings = getTotalAmount("Savings") * -1;
      const totalSpent = getTotalAmount("Transaction") * -1;
      const totalIncome = getTotalAmount("Income");
      setSavedAmount(totalSavings);
      setSpentAmount(totalSpent);
      setIncomeAmount(totalIncome);
      setTotalNet(totalIncome - totalSavings - totalSpent);
    }
  }, [currentMonthData])

  const getMessage = () => {
    if (totalNet < 0) {
      return <Text>You are overspending this month!</Text>
    } else if (totalNet < 500) {
      return <Text>You are almost running out.</Text>
    } else if (totalNet < 1500) {
      return <Text>Keep it up!</Text>
    } else {
      return <Text>You have a lot left to spend this month!</Text>
    }
  }

  return (
    <Flex height="100%" mr={5} width={isMobile ? '100%' : '15%'} flexDir="column">
      <Card className={styles.smallCard} mb={5}>
        <CardHeader>
          <Heading size="md">Hello, {user.displayName.split(" ")[0]}!</Heading>
        </CardHeader>
        <CardBody className={styles.cardBody}>
          <Flex flexDir="column" height="100%" justifyContent="center">
            <Box textAlign="center" mb={5}>
              <AnimatedNumber prefix="$" round={2} value={parseFloat(totalNet.toFixed(2))} className={styles.amount} />
              <Heading size="sm" fontWeight="normal">remaining in {month}</Heading>
            </Box>
            <Box className={styles.message}>
              {currentMonthData.length && getMessage()}
            </Box>
          </Flex>
        </CardBody>
      </Card>
      <Card className={styles.calendar}>
        <Box className={styles.month}>{month}</Box>
        <Flex flexDir="column" alignItems="center" justifyContent="center" height="100%">
          <Text className={styles.day}>{date.getDate()}</Text>
          <Text className={styles.text}>Days Left: {daysLeft}</Text>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Overview
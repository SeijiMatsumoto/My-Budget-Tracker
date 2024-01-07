"use client"
import {
  Text,
  Flex,
  Heading,
  Card,
  CardBody,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMySettingsContext } from '@/contexts/SettingsContext'
import Sliders from './Sliders'

interface Budget {
  title: string;
  value: number;
}

const SplitBudget = () => {
  const { budgets, setBudgets } = useMySettingsContext();
  const [sum, setSum] = useState<number>(100);

  useEffect(() => {
    setSum(budgets.reduce((accumulator: number, item: Budget) => accumulator + item.value, 0));
  }, [budgets])

  const changeHandler = (value: number, index: number) => {
    const budgetsCopy = budgets.slice();
    budgetsCopy[index].value = value;
    setBudgets(budgetsCopy)
  }

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="sm">Split Budget</Heading>
      <Text fontSize="12px"><b>Note:</b> The most ideal split is 50/30/20.</Text>
      <Flex flexDir="column">
        <Card width="100%" padding={1} mt={3} mb={0} textAlign="center">
          <CardBody>
            <Text>Total: {sum}%</Text>
            {sum === 100 ? <Text>You're all set!</Text> : <Text>Adjust the sliders so they add up to 100%.</Text>}
          </CardBody>
        </Card>
        {
          budgets.map((budget: Budget, index: number) =>
          (
            <Sliders key={budget.title + index} title={budget.title} value={budget.value} index={index} onChange={changeHandler} />
          ))
        }
      </Flex>
    </Flex>)
}

export default SplitBudget
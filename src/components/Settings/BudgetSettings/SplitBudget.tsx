"use client"
import {
  Text,
  Flex,
  Heading,
  useToast,
  Spinner,
  Button
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import Sliders from './Sliders'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast'

interface Budget {
  title: string;
  value: number;
}

const SplitBudget = () => {
  const toast = useToast();
  const { user, loading } = useAuth();
  const { budgetsData, setBudgetsData } = useMyDataContext();
  const [sum, setSum] = useState<number>(100);

  useEffect(() => {
    setSum(budgetsData.reduce((accumulator: number, item: Budget) => accumulator + item.value, 0));
  }, [budgetsData])

  const changeHandler = (value: number, index: number) => {
    const budgetsCopy = budgetsData.slice();
    budgetsCopy[index].value = value;
    setBudgetsData(budgetsCopy)
  }

  const submitHandler = () => {
    setDataInFirestore(user, "budget", setBudgetsData, budgetsData, returnToast, toast)
  }

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="md" mb={2} fontWeight="normal">Split Budget Settings</Heading>
      <Text fontSize="12px"><b>Note:</b> The most ideal split is 50/30/20.</Text>
      <Text fontSize="12px">The ratio will be taken from the amount of income you get this month.</Text>
      <Flex flexDir="column" mb={10}>
        <Flex width="100%" padding={1} mt={3} mb={0} flexDir="column" alignItems="center" justifyContent="center">
          <Text fontSize="2vw">Total: {sum}%</Text>
          {sum === 100 ? <Text>You're all set!</Text> : <Text>Adjust the sliders so they add up to 100%.</Text>}
        </Flex>
        {
          !loading ? budgetsData.map((budget: Budget, index: number) =>
          (
            <Sliders key={budget.title + index} title={budget.title} value={budget.value} index={index} onChange={changeHandler} />
          )) : <Flex width="100%" justifyContent="center" ><Spinner /></Flex>
        }
      </Flex>
      <Flex justifyContent="center">
        <Button disabled={sum !== 100 || loading} variant="outline" colorScheme="telegram" onClick={submitHandler}>Save Budgets</Button>
      </Flex>
    </Flex>
  )
}

export default SplitBudget
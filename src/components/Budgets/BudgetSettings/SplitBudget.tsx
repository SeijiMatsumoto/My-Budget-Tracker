"use client"
import {
  Text,
  Flex,
  Heading,
  useToast,
  Spinner,
  Box
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import Sliders from './Sliders'
import { Button } from '@mui/material'
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
  const { budgets, setBudgets } = useMyDataContext();
  const [sum, setSum] = useState<number>(100);

  useEffect(() => {
    setSum(budgets.reduce((accumulator: number, item: Budget) => accumulator + item.value, 0));
  }, [budgets])

  const changeHandler = (value: number, index: number) => {
    const budgetsCopy = budgets.slice();
    budgetsCopy[index].value = value;
    setBudgets(budgetsCopy)
  }

  const submitHandler = () => {
    setDataInFirestore(user, "budget", setBudgets, budgets, returnToast, toast)
  }

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="sm">Split Budget</Heading>
      <Text fontSize="12px"><b>Note:</b> The most ideal split is 50/30/20.</Text>
      <Flex flexDir="column" mb={7}>
        <Flex width="100%" padding={1} mt={3} mb={0} flexDir="column" alignItems="center" justifyContent="center">
          <Text fontSize="2vw">Total: {sum}%</Text>
          {sum === 100 ? <Text>You're all set!</Text> : <Text>Adjust the sliders so they add up to 100%.</Text>}
        </Flex>
        {
          !loading ? budgets.map((budget: Budget, index: number) =>
          (
            <Sliders key={budget.title + index} title={budget.title} value={budget.value} index={index} onChange={changeHandler} />
          )) : <Flex width="100%" justifyContent="center" ><Spinner /></Flex>
        }
      </Flex>
      <Button disabled={sum !== 100 && loading} variant="contained" onClick={submitHandler}>Update</Button>
    </Flex>)
}

export default SplitBudget
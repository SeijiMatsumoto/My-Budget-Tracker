"use client"
import React from 'react'
import { Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';

const Budget = () => {
  const { budgetType, setBudgetType } = useMyDataContext();

  return (
    <Flex flexDir="column">
      <RadioGroup onChange={setBudgetType} value={budgetType} mb={2}>
        <Stack direction="row">
          <Radio value="All">All</Radio>
          <Radio value="Needs">Needs</Radio>
          <Radio value="Wants">Wants</Radio>
          <Radio value="Savings">Savings</Radio>
        </Stack>
      </RadioGroup>
    </Flex>)
}

export default Budget
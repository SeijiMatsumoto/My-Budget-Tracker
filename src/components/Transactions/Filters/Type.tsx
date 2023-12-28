"use client"
import React from 'react'
import { Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';

const Type = () => {
  const { type, setType } = useMyDataContext();

  return (
    <Flex flexDir="column">
      <RadioGroup onChange={setType} value={type} mb={2}>
        <Stack direction="row">
          <Radio value="All">All</Radio>
          <Radio value="Income">Income</Radio>
          <Radio value="Savings">Savings</Radio>
          <Radio value="Transaction">Transaction</Radio>
        </Stack>
      </RadioGroup>
    </Flex>)
}

export default Type
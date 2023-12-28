"use client"
import React from 'react'
import { Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {
  type: string;
  setType: (nextValue: string) => void;
}

const Type = ({ type, setType }: Props) => {
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
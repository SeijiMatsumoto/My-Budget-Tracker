import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Transactions from './Transactions'
import Overview from './Overview'
import Budgets from './Budgets'

type Props = {}

function Dashboard({ }: Props) {
  return (
    <Flex flexDir="column">
      <Flex flexDir="row" justifyContent={'space-between'}>
        <Overview />
        <Budgets />
      </Flex>
      <Transactions />
    </Flex>
  )
}

export default Dashboard
import { Flex } from '@chakra-ui/react'
import React from 'react'
import Transactions from './Transactions'
import Spending from './Spending'
import Budgets from './Budgets'
import Overview from './Overview'

type Props = {}

function Dashboard({ }: Props) {
  return (
    <Flex flexDir="column" height="100%">
      <Flex flexDir="row" justifyContent='space-between' height="52%">
        <Overview />
        <Spending />
        <Budgets />
      </Flex>
      <Transactions />
    </Flex>
  )
}

export default Dashboard
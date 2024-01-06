import { Flex } from '@chakra-ui/react'
import React from 'react'
import BudgetSettings from './BudgetSettings/BudgetSettings'
import Charts from './Charts'

const Budgets = () => {
  return (
    <Flex flexDir="row" height="100%">
      <BudgetSettings />
      <Charts />
    </Flex>
  )
}

export default Budgets
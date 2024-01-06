"use client"
import { Flex } from '@chakra-ui/react'
import React from 'react'
import Transactions from './Transactions'
import Spending from './Spending'
import Budgets from './Budgets'
import Overview from './Overview'
import useIsMobile from '@/hooks/useIsMobile'

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <Flex flexDir="column" height="100%" width="100%">
      {isMobile ?
        <Flex flexDir="column" width="100%">
          <Overview />
          <Spending />
          <Budgets />
        </Flex>
        :
        <Flex flexDir="row" justifyContent={'space-between'} height={"52%"}>
          <Overview />
          <Spending />
          <Budgets />
        </Flex>
      }
      <Transactions />
    </Flex>
  )
}

export default Dashboard
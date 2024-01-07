import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import SplitBudget from './SplitBudget'

const BudgetSettings = () => {

  return (
    <Card width="30%" mr={5}>
      <CardHeader>
        <Heading size="md">Adjust Budgets</Heading>
      </CardHeader>
      <CardBody overflow-y="scroll">
        <Flex flexDir="column">
          <SplitBudget />
          <Flex>
            <Heading size="sm">Categories</Heading>
            <Box>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default BudgetSettings
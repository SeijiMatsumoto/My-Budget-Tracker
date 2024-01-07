"use client"
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SplitBudget from './SplitBudget'
import { useMySettingsContext } from '@/contexts/SettingsContext'

const BudgetSettings = () => {
  const { budgets } = useMySettingsContext();
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <Card width="30%" mr={5}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading size="md">Adjust Budgets</Heading>
        <Button disabled={disabled}>Save</Button>
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
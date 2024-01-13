"use client"
import {
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import RecurringAccordion from './RecurringAccordion'

const Recurring = () => {
  const { recurringData } = useMyDataContext();
  console.log(recurringData)
  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="md" fontWeight="normal" mb={2}>Recurring Items</Heading>
      <Flex justifyContent="center">
        <Flex mb={3} justifyContent="center" width="100%">
          {
            recurringData.length ?
              <RecurringAccordion /> : <Spinner />
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Recurring
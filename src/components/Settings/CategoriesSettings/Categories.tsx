"use client"
import {
  Flex,
  Heading,
  Spinner,
} from '@chakra-ui/react'
import React from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import CategoriesAccordion from './CategoriesAccordion'

const Categories = () => {
  const { categoriesData } = useMyDataContext();

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="md" fontWeight="normal" mb={4}>Categories</Heading>
      <Flex alignItems="center" flexDir="column">
        <Flex mb={3} justifyContent="center" width="100%">
          {
            categoriesData.length ?
              <CategoriesAccordion /> : <Spinner />
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Categories
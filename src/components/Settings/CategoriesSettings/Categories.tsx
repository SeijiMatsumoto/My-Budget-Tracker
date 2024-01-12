"use client"
import {
  Text,
  Flex,
  Heading,
  useToast,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  StylesProvider,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import { Button } from '@mui/material'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast'
import styles from '@/styles/Settings/settings.module.scss'

interface Category {
  type: string;
  data: string[];
}

const Categories = () => {
  const toast = useToast();
  const { user, loading } = useAuth();
  const { categoriesData, setCategoriesData } = useMyDataContext();

  const changeHandler = (value: number, index: number) => {

  }

  const submitHandler = () => {
    setDataInFirestore(user, "categories", setCategoriesData, categoriesData, returnToast, toast)
  }

  return (
    <Flex flexDir="column" mb={10}>
      <Heading size="md" fontWeight="normal" mb={4}>Categories</Heading>
      <Flex alignItems="center" flexDir="column">
        <Flex mb={3} justifyContent="center" width="100%">
          {
            categoriesData.length ?
              <Accordion allowToggle width="100%">
                {categoriesData.map((categoryType: Category, index: number) => {
                  return (
                    <AccordionItem key={categoryType.type + index} flexDir="column">
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            {categoryType.type.slice(0, 1).toUpperCase() + categoryType.type.slice(1)} Categories
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel >
                        {categoryType.data.map((category: string, i: number) => {
                          return (
                            <Flex key={category + i} flexDir="column">
                              {category}
                            </Flex>
                          )
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
              </Accordion>
              : <Spinner />
          }
        </Flex>
        <Button variant="outlined" onClick={submitHandler}>Update Categories</Button>
      </Flex>
    </Flex>
  )
}

export default Categories
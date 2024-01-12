"use client"
import {
  Text,
  Flex,
  Heading,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useMyDataContext } from '@/contexts/DataContext'
import { Button } from '@mui/material'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast'

interface Budget {
  title: string;
  value: number;
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
      <Heading size="md" fontWeight="normal" mb={2}>Categories</Heading>
      <Flex justifyContent="center">
        <Button variant="outlined" onClick={submitHandler}>Update Categories</Button>
      </Flex>
    </Flex>
  )
}

export default Categories
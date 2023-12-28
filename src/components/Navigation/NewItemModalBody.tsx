"use client";
import React, { useEffect } from 'react'
import {
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  InputGroup,
  Input,
  InputLeftElement,
  Select,
  Box,
  Flex,
} from '@chakra-ui/react'
import styles from '@/styles/Navigation/newItemModal.module.scss'
import { transactionCategories, incomeCategories } from '@/data/dummyData/categories'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from '@chakra-ui/next-js';
import { useMyNavigationContext } from '@/contexts/NavigationContext';

interface Props {
  itemType: string;
  setItemType: any;
  title: string;
  setTitle: Function;
  amount: any;
  setAmount: Function;
  selectedCategory: string;
  setSelectedCategory: Function;
  startDate: any;
  setStartDate: Function;
  submitHandler: any;
  onClose: Function
}

const NewItemModalBody = ({
  itemType,
  setItemType,
  title,
  setTitle,
  amount,
  setAmount,
  selectedCategory,
  setSelectedCategory,
  startDate,
  setStartDate,
  submitHandler,
  onClose
}: Props) => {
  const { setPage } = useMyNavigationContext();

  useEffect(() => {
    if (itemType === 'Income') {
      setSelectedCategory("Income")
    }
  }, [itemType])

  const editCategories = () => {
    setPage("Settings");
    onClose();
  }

  return (
    <ModalBody>
      <FormControl onSubmit={submitHandler}>
        <Box mb="20px">
          <FormLabel>➕ Item type:</FormLabel>
          <RadioGroup
            defaultValue={itemType}
            value={itemType}
            onChange={setItemType}
          >
            <HStack spacing='24px'>
              <Radio value='Transaction'>Transaction</Radio>
              <Radio value='Income'>Income</Radio>
              <Radio value='Savings'>Savings</Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Box mb="20px">
          <FormLabel>📆 Date</FormLabel>
          <DatePicker
            className={styles.datePicker}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)} />
        </Box>
        <Box mb="20px">
          <FormLabel>✏️ Title</FormLabel>
          <InputGroup>
            <Input placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} autoComplete='off' />
          </InputGroup>
        </Box>
        <Box mb="20px">
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel>📒 Category</FormLabel>
            <FormHelperText position="relative" top="-2px">
              <Link href="/settings" onClick={editCategories}>Edit categories</Link>
            </FormHelperText>
          </Flex>
          <Select placeholder='Select category' value={selectedCategory} onChange={(e: any) => setSelectedCategory(e.target.value)}>
            {itemType === "Transaction" && transactionCategories.map(category => {
              return (
                <option key={category}>{category}</option>
              )
            })}
            {itemType === "Income" && incomeCategories.map(category => {
              return (
                <option key={category}>{category}</option>
              )
            })}
          </Select>
        </Box>
        <Box>
          <FormLabel>💰 {itemType} amount</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color={amount ? 'black' : 'gray.300'}
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <Input placeholder='Enter amount' value={amount} onChange={(e: any) => setAmount(e.target.value)} autoComplete='off' />
          </InputGroup>
        </Box>
      </FormControl>
    </ModalBody>
  )
}

export default NewItemModalBody
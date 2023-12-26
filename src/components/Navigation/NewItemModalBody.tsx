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
  Select
} from '@chakra-ui/react'
import styles from '@/styles/Navigation/newItemModal.module.scss'
import { transactionCategories, incomeCategories } from '@/data/categories'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  itemType: string;
  setItemType: any;
  amount: any;
  setAmount: Function;
  selectedCategory: string;
  setSelectedCategory: Function;
  startDate: any;
  setStartDate: Function;
  submitHandler: any;
}

const NewItemModalBody = ({
  itemType,
  setItemType,
  amount,
  setAmount,
  selectedCategory,
  setSelectedCategory,
  startDate,
  setStartDate,
  submitHandler
}: Props) => {

  useEffect(() => {
    if (itemType === 'Income') {
      setSelectedCategory("Income")
    }
  }, [itemType])

  return (
    <ModalBody>
      <FormControl onSubmit={submitHandler}>
        <FormLabel>➕ Item type:</FormLabel>
        <RadioGroup
          defaultValue={itemType}
          value={itemType}
          onChange={setItemType}
          mb="20px">
          <HStack spacing='24px'>
            <Radio value='Transaction'>Transaction (money out)</Radio>
            <Radio value='Income'>Income (money in)</Radio>
          </HStack>
        </RadioGroup>
        <FormLabel>💰 Enter {itemType.toLowerCase()} amount in dollars</FormLabel>
        <InputGroup mb="20px">
          <InputLeftElement
            pointerEvents='none'
            color={amount ? 'black' : 'gray.300'}
            fontSize='1.2em'
          >
            $
          </InputLeftElement>
          <Input placeholder='Enter amount' value={amount} onChange={(e: any) => setAmount(e.target.value)} autoComplete='off' />
        </InputGroup>
        <FormLabel>📒 Category</FormLabel>
        <Select placeholder='Select category' mb="20px" value={selectedCategory} onChange={(e: any) => setSelectedCategory(e.target.value)}>
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
        <FormLabel>📆 Date</FormLabel>
        <DatePicker
          className={styles.datePicker}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)} />
      </FormControl>
    </ModalBody>
  )
}

export default NewItemModalBody
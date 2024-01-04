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
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react'
import styles from '@/styles/Navigation/newItemModal.module.scss'
import { transactionCategories, incomeCategories, savingsCategories } from '@/data/dummyData/categories'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from '@chakra-ui/next-js';
import { useMyNavigationContext } from '@/contexts/NavigationContext';

interface Props {
  itemType: string;
  setItemType: any;
  budgetType: string;
  setBudgetType: any;
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

const EditItemModalBody = ({
  itemType,
  setItemType,
  budgetType,
  setBudgetType,
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
  const tabs = ['Transaction', 'Savings', 'Income']

  useEffect(() => {
    if (itemType === 'Income') {
      setSelectedCategory("Income")
    }
  }, [itemType])

  const editCategories = () => {
    setPage("Settings");
    onClose();
  }

  const InnerBody = () => {
    return (
      <Flex flexDir="column">
        <Box mb="20px">
          <FormLabel>📆 Date</FormLabel>
          <DatePicker
            className={styles.datePicker}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)} />
        </Box>
        {itemType !== "Income" ? <Box mb="20px">
          <FormLabel>🤔 Budget Type:</FormLabel>
          <RadioGroup
            value={budgetType}
            onChange={setBudgetType}
          >
            <HStack spacing='24px'>
              {itemType === "Transaction" ? <Radio value='Need'>Need (50%)</Radio> : null}
              {itemType === "Transaction" ? <Radio value='Want'>Want (30%)</Radio> : null}
              {itemType === "Savings" ? <Radio value='Savings' defaultChecked>Savings (20%)</Radio> : null}
            </HStack>
          </RadioGroup>
        </Box> : null}
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
            {itemType === "Savings" && savingsCategories.map(category => {
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
      </Flex>
    )
  }

  return (
    <ModalBody>
      <FormControl onSubmit={submitHandler}>
        <Tabs isFitted variant='enclosed' onChange={(index) => setItemType(tabs[index])}>
          <TabList mb='1em'>
            {tabs.map(tab => <Tab key={tab + 'tab'}>{tab}</Tab>)}
          </TabList>
          <TabPanels>
            {tabs.map(tab => <TabPanel key={tab + 'tabPanel'}>{InnerBody()}</TabPanel>)}
          </TabPanels>
        </Tabs>
      </FormControl>
    </ModalBody>
  )
}

export default EditItemModalBody
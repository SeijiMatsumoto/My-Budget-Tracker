"use client";
import React, { useEffect, useState } from 'react'
import {
  ModalBody,
  FormControl,
  FormLabel,
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
  Tabs, TabList, TabPanels, Tab, TabPanel, Button,
  useToast,
} from '@chakra-ui/react'
import styles from '@/styles/Navigation/newItemModal.module.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from '@chakra-ui/next-js';
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { CloseIcon } from '@chakra-ui/icons'
import { useMyDataContext } from '@/contexts/DataContext';

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
  tags: string[];
  setTags: Function;
  submitHandler: any;
  onClose: Function
}

const PopUpModalBody = ({
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
  tags,
  setTags,
  submitHandler,
  onClose
}: Props) => {
  const { categoriesData } = useMyDataContext();
  const { setPage } = useMyNavigationContext();
  const tabs = ['Transaction', 'Savings', 'Income']
  const [tagValue, setTagValue] = useState<string>('');
  const toast = useToast()

  useEffect(() => {
    if (itemType === 'Income') {
      setSelectedCategory("Income")
    }
  }, [itemType])

  const editCategories = () => {
    setPage("Settings");
    onClose();
  }

  const addTag = () => {
    if (tags.includes(tagValue)) {
      return toast({
        title: "Tag already exists",
        position: "bottom",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      if (tags.length >= 5) {
        return toast({
          title: "Limit of 5 tags",
          position: "bottom",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } else {
        setTags([...tags, tagValue]);
        setTagValue("");
      }
    }
  }

  const removeTag = (selectedTag: string) => {
    setTags(tags.filter(tag => tag !== selectedTag))
  }

  const getIndex = (type: string) => {
    if (type === 'Transaction') return 0;
    else if (type === 'Savings') return 1;
    else return 2;
  }

  const InnerBody = () => {
    return (
      <Flex flexDir="column">
        <Box mb={5}>
          <FormLabel fontWeight="bold">Date</FormLabel>
          <DatePicker
            className={styles.datePicker}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)} />
        </Box>
        {itemType === "Transaction" ? <Box mb={5}>
          <FormLabel fontWeight="bold">Budget Type</FormLabel>
          <RadioGroup
            value={budgetType}
            onChange={setBudgetType}
          >
            <HStack spacing='24px'>
              <Radio value='Need'>Need (50%)</Radio>
              <Radio value='Want'>Want (30%)</Radio>
            </HStack>
          </RadioGroup>
        </Box> : null}
        <Box mb={5}>
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel fontWeight="bold">Category</FormLabel>
            <FormHelperText position="relative" top="-2px">
              <Link href="/settings" onClick={editCategories}>Edit categories</Link>
            </FormHelperText>
          </Flex>
          <Select placeholder='Select category' value={selectedCategory} onChange={(e: any) => setSelectedCategory(e.target.value)}>
            {categoriesData[getIndex(itemType)].data.map((category: any) => {
              return (
                <option key={category}>{category}</option>
              )
            })}
          </Select>
        </Box>
        <Box mb={5}>
          <FormLabel fontWeight="bold">Title</FormLabel>
          <InputGroup>
            <Input placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} autoComplete='off' />
          </InputGroup>
        </Box>
        <Box mb={5}>
          <FormLabel fontWeight="bold">{itemType} amount</FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color={amount ? 'black' : 'gray.300'}
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <Input placeholder='Enter amount' value={parseFloat(amount).toFixed(2) || 0.00} onChange={(e: any) => setAmount(e.target.value)} autoComplete='off' />
          </InputGroup>
        </Box>
        <Box>
          <FormLabel fontWeight="bold">Tags</FormLabel>
          <InputGroup mb={2}>
            <Input mr={2} placeholder="Add up to 5 tags" value={tagValue} onChange={(e: any) => setTagValue(e.target.value)} autoComplete='off' />
            <Button onClick={addTag}>Add</Button>
          </InputGroup>
          <Flex flexWrap="wrap">
            {
              tags.map((tag: string) => {
                return (
                  <Box className={styles.tag} onClick={() => removeTag(tag)}>
                    {tag}
                    <CloseIcon ml="5px" fontSize="6px" />
                  </Box>
                )
              })
            }
          </Flex>
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
            {tabs.map(tab => <TabPanel key={tab + 'tabPanel'} pt={0}>{InnerBody()}</TabPanel>)}
          </TabPanels>
        </Tabs>
      </FormControl>
    </ModalBody>
  )
}

export default PopUpModalBody;
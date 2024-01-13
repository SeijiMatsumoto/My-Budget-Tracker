"use client"
import React, { useState } from 'react'
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  Input,
  useToast
} from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast'
import { setDataInFirestore } from '@/data/useFirebase'
import { useMyDataContext } from '@/contexts/DataContext'
import Category from './Category'

interface Category {
  type: string;
  data: string[];
}

const CategoriesAccordion = () => {
  const toast = useToast();
  const { user } = useAuth();
  const [newCategoryInput, setNewCategoryInput] = useState<string>('');
  const { categoriesData, setCategoriesData } = useMyDataContext();

  const submitHandler = (index: number) => {
    const temp = categoriesData.slice();
    if (newCategoryInput.length && !temp[index].data.includes(newCategoryInput)) {
      temp[index].data.unshift(newCategoryInput);
      setDataInFirestore(user, "categories", setCategoriesData, temp, returnToast, toast)
    } else {
      returnToast(toast, false, 'Category already exists in ' + categoriesData[index].type)
    }
    setNewCategoryInput("");
  }

  return (
    <Accordion allowToggle width="100%">
      {categoriesData.map((categoryType: Category, index: number) => {
        return (
          <AccordionItem key={categoryType.type + index} flexDir="column">
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  {categoryType.type.slice(0, 1).toUpperCase() + categoryType.type.slice(1)} categories
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel >
              <Box mb={5}>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      colorScheme="telegram"
                      width="100%"
                      variant="solid"
                    >Add new {categoryType.type.toLowerCase()} category</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>New category</PopoverHeader>
                    <PopoverBody>
                      <FormControl onSubmit={() => submitHandler(index)}>
                        <Flex flexDir="row">
                          <Input value={newCategoryInput} onChange={(e) => setNewCategoryInput(e.target.value)} mr={3} />
                          <Button onClick={() => submitHandler(index)}>Add</Button>
                        </Flex>
                      </FormControl>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Box>
              {categoryType.data.map((category: string, i: number) => {
                return (
                  <Category category={category} index={index} innerIndex={i} />
                )
              })}
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default CategoriesAccordion
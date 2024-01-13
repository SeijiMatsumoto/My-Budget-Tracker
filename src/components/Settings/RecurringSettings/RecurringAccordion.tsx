"use client"
import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext'
import RecurringItem from './RecurringItem'
import RecurringModal from './RecurringNewModal'

interface Category {
  type: string;
  data: string[];
}

const RecurringAccordion = () => {
  const { recurringData } = useMyDataContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <Accordion allowToggle width="100%">
      {recurringData.map((categoryType: Category, index: number) => {
        return (
          <AccordionItem key={categoryType.type + index} flexDir="column">
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  {categoryType.type.slice(0, 1).toUpperCase() + categoryType.type.slice(1)} recurring items
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel >
              <Box mb={5}>
                <Button
                  colorScheme="telegram"
                  width="100%"
                  variant="solid"
                  onClick={() => { setIsOpen(true); setSelectedIndex(index) }}
                >Add new recurring item</Button>
              </Box>
              {recurringData?.data?.length && recurringData.data.map((item: string, i: number) => {
                return (
                  <RecurringItem item={item} index={index} innerIndex={i} open={isOpen} onClose={() => setIsOpen(false)} />
                )
              })}
            </AccordionPanel>
          </AccordionItem>
        )
      })}
      <RecurringModal open={isOpen} onClose={() => setIsOpen(false)} index={selectedIndex} />
    </Accordion>
  )
}

export default RecurringAccordion
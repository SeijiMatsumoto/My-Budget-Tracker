"use client"
import React, { useState } from 'react'
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormLabel,
  FormControl,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext'
import DatePicker from "react-datepicker";
import styles from '@/styles/Settings/settings.module.scss'

type Props = {
  open: boolean;
  onClose: () => void;
  index: number | null;
}
const RecurringNewModal = ({ open, onClose, index }: Props) => {
  const { recurringData, setRecurringData } = useMyDataContext();
  const [input, setInput] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());

  const title = recurringData[index || 0].type.slice(0, 1).toUpperCase() + recurringData[index || 0].type.slice(1);

  return (
    <Modal isOpen={open} onClose={onClose} size='lg' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recurring Item</ModalHeader>
        <ModalBody>
          <FormControl display='flex' flexDir="column">
            <Box mb={5}>
              <FormLabel fontWeight="bold">{title} amount</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='black'
                  fontSize='1.2em'
                >
                  $
                </InputLeftElement>
                <Input placeholder='Enter amount' value={input} onChange={(e: any) => setInput(e.target.value)} autoComplete='off' />
              </InputGroup>
            </Box>
            <Flex flexDir="row" mb={5} >
              <Box width="50%">
                <FormLabel fontWeight="bold">Start Date</FormLabel>
                <DatePicker
                  className={styles.datePicker}
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)} />
              </Box>
              <Box width="50%">
                <FormLabel fontWeight="bold">Recurrence</FormLabel>
                <Select placeholder="Select frequency" onChange={(e) => setFrequency(e.target.value)} value={frequency}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Select>
              </Box>
            </Flex>
            <Box mb={5}>
              <FormLabel fontWeight="bold">Every</FormLabel>

            </Box>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>)
}

export default RecurringNewModal
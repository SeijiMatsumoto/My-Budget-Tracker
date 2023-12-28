"use client"
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import NewItemModalBody from './NewItemModalBody';
import { isValidDollar } from '@/utils/formValidator'
import { useMyDataContext } from '@/contexts/DataContext';

type Props = {
  open: boolean;
  onClose: () => void;
}

const NewItemModal = ({ open, onClose }: Props) => {
  const [itemType, setItemType] = useState<string>('Transaction')
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<any>(new Date());
  const { transactionsData, setTransactionsData } = useMyDataContext();

  const resetStates = () => {
    setItemType("Transaction");
    setTitle("");
    setAmount("");
    setSelectedCategory("");
    setStartDate(new Date());
  }

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}-${day}-${year}`;
  }

  const submitHandler = () => {
    if (isValidDollar(amount) && selectedCategory.length && title.length) {
      const newItem = {
        type: itemType,
        title: title,
        amount: parseInt(amount),
        category: selectedCategory,
        date: formatDate(startDate)
      }
      console.log([newItem, ...transactionsData])
      window.alert("Valid! Submitting...");
      setTransactionsData([newItem, ...transactionsData])
      onClose();
      resetStates();
    } else {
      window.alert("Invalid input!!");
    }
  }

  return (
    <Modal isOpen={open} onClose={onClose} size={'xl'} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Item</ModalHeader>
        <NewItemModalBody
          itemType={itemType}
          setItemType={setItemType}
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          submitHandler={submitHandler}
          onClose={onClose}
        />
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={() => { onClose(); resetStates(); }}>Cancel</Button>
          <Button colorScheme='telegram' onClick={submitHandler}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewItemModal
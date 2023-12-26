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

type Props = {
  open: boolean;
  onClose: () => void;
}

const NewItemModal = ({ open, onClose }: Props) => {
  const [itemType, setItemType] = useState('Transaction')
  const [amount, setAmount] = useState<string | null>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState<any>(new Date());

  const resetStates = () => {
    setItemType("Transaction");
    setAmount(null);
    setSelectedCategory("");
    setStartDate(new Date());
  }

  const submitHandler = () => {
    if (isValidDollar(amount) && selectedCategory.length) {
      window.alert("Valid! Submitting...");
      onClose();
      resetStates();
    } else {
      window.alert("Invalid input!!");
    }
  }

  return (
    <Modal isOpen={open} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Item</ModalHeader>
        <NewItemModalBody
          itemType={itemType}
          setItemType={setItemType}
          amount={amount}
          setAmount={setAmount}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          submitHandler={submitHandler}
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
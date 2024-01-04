"use client"
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useToast
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';
import EditItemModalBody from './EditItemModalBody';
import { convertDate } from '@/utils/convertDate';

type Props = {
  data: Transaction;
  index: number;
  open: boolean;
  onClose: () => void;
}

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}
const EditItemModal = ({ data, index, open, onClose }: Props) => {
  const toast = useToast()
  const [itemType, setItemType] = useState<string>(data.type)
  const [title, setTitle] = useState<string>(data.title);
  const [amount, setAmount] = useState<string>(data.amount.toString());
  const [selectedCategory, setSelectedCategory] = useState<string>(data.category);
  const [startDate, setStartDate] = useState<Date>(convertDate(data.date));
  const [budgetType, setBudgetType] = useState<string>(data.budget);
  const { transactionsData, setTransactionsData } = useMyDataContext();

  useEffect(() => {
    if (itemType === "Savings") setBudgetType("Savings")
    else if (itemType === "Transaction") setBudgetType("Need");
    else if (itemType === "Income") setBudgetType("");
  }, [itemType])

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}-${day}-${year}`;
  }

  const submitHandler = () => {
    if (amount && selectedCategory.length && title.length) {
      let thisAmount = itemType === "Income" ? parseFloat(amount) : parseFloat
        (amount) * -1;
      const editedItem = {
        type: itemType,
        title: title,
        amount: thisAmount,
        budget: budgetType,
        category: selectedCategory,
        date: formatDate(startDate)
      }
      const copy = transactionsData.slice();
      console.log(transactionsData, copy)
      copy[index] = editedItem;
      setTransactionsData(copy)
      showSuccess();
      onClose();
    } else {
      showError();
    }
  }

  const showSuccess = () => {
    return toast({
      title: 'Successfully edited',
      position: "top",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const showError = () => {
    return toast({
      title: 'Invalid input',
      description: "Please fill in all details.",
      position: "top",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Modal isOpen={open} onClose={onClose} size={'xl'} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <EditItemModalBody
          itemType={itemType}
          setItemType={setItemType}
          budgetType={budgetType}
          setBudgetType={setBudgetType}
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
          <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme='telegram' onClick={submitHandler}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditItemModal;
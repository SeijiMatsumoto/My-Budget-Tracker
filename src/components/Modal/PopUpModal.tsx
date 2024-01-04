"use client"
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';
import { convertDate } from '@/utils/convertDate';
import { generateRandomId } from '@/utils/idGenerator'
import PopUpModalBody from './PopUpModalBody';
import { positiveOrNegative } from '@/utils/convertDollars';
import AreYouSure from './AreYouSure';

type Props = {
  isNewItem: boolean;
  data: Transaction | null;
  index: number;
  open: boolean;
  onClose: () => void;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}
const PopUpModal = ({ isNewItem, data, index, open, onClose }: Props) => {
  const { isOpen, onOpen, onClose: onClosePopup } = useDisclosure();

  const toast = useToast()
  const [itemType, setItemType] = useState<string>(data?.type || "Transaction")
  const [title, setTitle] = useState<string>(data?.title || "");
  const [amount, setAmount] = useState<string>(positiveOrNegative(data?.amount) || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(data?.category || "");
  const [startDate, setStartDate] = useState<Date>(data && convertDate(data?.date) || new Date());
  const [budgetType, setBudgetType] = useState<string>(data?.budget || "");
  const { transactionsData, setTransactionsData } = useMyDataContext();
  const resetStates = () => {
    setItemType("Transaction");
    setTitle("");
    setAmount("");
    setSelectedCategory("");
    setStartDate(new Date());
  }

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
      const newItem = {
        id: `${generateRandomId()}-${title}`,
        type: itemType,
        title: title,
        amount: thisAmount,
        budget: budgetType,
        category: selectedCategory,
        date: formatDate(startDate)
      }
      const copy = transactionsData.slice();
      if (isNewItem) {
        copy.push(newItem);
        copy.sort((a: Transaction, b: Transaction) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        setTransactionsData([...copy]);
      } else {
        copy[index] = newItem;
        setTransactionsData(copy)
      }
      resetStates();
      showSuccess();
      onClose();
    } else {
      showError();
    }
  }

  const showSuccess = () => {
    return toast({
      title: isNewItem ? 'Successfully added expense' : 'Successfully edited expense',
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

  const deleteItem = () => {
    const copy = transactionsData.filter((transaction: Transaction) => transaction.id !== data?.id);
    setTransactionsData(copy)
    onClosePopup()
  }

  return (
    <Modal isOpen={open} onClose={onClose} size={'xl'} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isNewItem ? "Add New Expense" : "Edit Expense"}</ModalHeader>
        <PopUpModalBody
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
          {!isNewItem && <Button mr={3} colorScheme='red' onClick={onOpen}>Delete</Button>}
          <Button colorScheme='telegram' onClick={submitHandler}>{isNewItem ? "Add" : "Save"}</Button>
          <AreYouSure isOpen={isOpen} onClose={onClosePopup} deleteItem={deleteItem} title={title} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PopUpModal;
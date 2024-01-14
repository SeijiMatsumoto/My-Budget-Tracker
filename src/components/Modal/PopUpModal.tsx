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
import { setDataInFirestore } from '@/data/useFirebase';
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast';
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
  tags: string[];
}
const PopUpModal = ({ isNewItem, data, index, open, onClose }: Props) => {
  const toast = useToast()
  const { user } = useAuth();
  const { isOpen, onOpen, onClose: onClosePopup } = useDisclosure();
  const { transactionsData, setTransactionsData } = useMyDataContext();

  const [itemType, setItemType] = useState<string>(data?.type || "Transaction")
  const [title, setTitle] = useState<string>(data?.title || "");
  const [amount, setAmount] = useState<string>(positiveOrNegative(data?.amount) || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(data?.category || "");
  const [startDate, setStartDate] = useState<Date>(data && convertDate(data?.date) || new Date());
  const [budgetType, setBudgetType] = useState<string>(data?.budget || "");
  const [tags, setTags] = useState<string[]>(data?.tags || []);
  const [frequency, setFrequency] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [futureDates, setFutureDates] = useState<Date[]>([]);

  const resetStates = () => {
    setItemType("Transaction");
    setTitle("");
    setAmount("");
    setSelectedCategory("");
    setStartDate(new Date());
    setTags([]);
    setFrequency("");
    setIsRecurring(false);
    setFutureDates([]);
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
      const copy = transactionsData.slice();

      if (futureDates.length) {
        for (let futureDate of futureDates) {
          const newItem = {
            id: `${generateRandomId()}-${title}`,
            type: itemType,
            title: title,
            amount: thisAmount,
            budget: budgetType,
            category: selectedCategory,
            date: formatDate(futureDate),
            tags: tags,
            recurring: isRecurring,
            frequency: frequency
          }
          if (isNewItem) {
            copy.push(newItem);
          } else {
            copy[index] = newItem;
          }
          copy.sort((a: Transaction, b: Transaction) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        }
      } else {
        const newItem = {
          id: `${generateRandomId()}-${title}`,
          type: itemType,
          title: title,
          amount: thisAmount,
          budget: budgetType,
          category: selectedCategory,
          date: formatDate(startDate),
          tags: tags,
          recurring: isRecurring,
          frequency: frequency
        }
        if (isNewItem) {
          copy.push(newItem);
        } else {
          copy[index] = newItem;
        }
        copy.sort((a: Transaction, b: Transaction) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
      }

      setDataInFirestore(user, itemType.toLowerCase(), setTransactionsData, copy, returnToast, toast);
      resetStates();
      onClose();
    } else {
      returnToast(toast, false, 'Please fill in all details.');
    }
  }

  const deleteItem = () => {
    const copy = transactionsData.filter((transaction: Transaction) => transaction.id !== data?.id);
    setDataInFirestore(user, itemType.toLowerCase(), setTransactionsData, copy, returnToast, toast)
    onClosePopup()
  }

  useEffect(() => {
    if (isRecurring && frequency.length) {
      setFutureDates(getFutureDates());
    }
  }, [frequency, startDate])

  const getFutureDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);

    switch (frequency) {
      case 'daily':
        for (let day = 0; day < 365; day++) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      case 'weekly':
        for (let week = 0; week < 52; week++) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 7);
        }
        break;
      case 'monthly':
        for (let year = 0; year < 2; year++) {
          for (let month = 0; month < 12; month++) {
            dates.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
        }
        break;
      case 'annually':
        for (let year = 0; year < 5; year++) {
          dates.push(new Date(currentDate));
          currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
        break;
      default:
        throw new Error('Invalid frequency');
    }

    return dates;
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
          tags={tags}
          setTags={setTags}
          submitHandler={submitHandler}
          onClose={onClose}
          isNewItem={isNewItem}
          frequency={frequency}
          setFrequency={setFrequency}
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
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
"use client"
import React, { useState } from 'react'
import styles from '@/styles/Transactions/sortableTable.module.scss'
import { Box, Flex } from '@chakra-ui/react'
import { convertDollarsToString } from '@/utils/convertDollars';
import PopUpModal from '../Modal/PopUpModal';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}

type Props = {
  data: Transaction;
  index: number;
}

const TableItem = ({ data, index }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const convertDate = (dateString: string) => {
    const dateParts = dateString.split('-');
    const formattedDate = new Date(`${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[formattedDate.getDay()];
    const month = monthsOfYear[formattedDate.getMonth()];

    const formattedDateString = `${month} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
    return {
      dayOfWeek: dayOfWeek,
      formattedDate: formattedDateString
    };

  }

  const { category, title, amount, date } = data;
  const formattedDate = convertDate(date);
  return (
    <Box className={styles.itemWrapper} onClick={() => setModalOpen(true)}>
      <Flex alignItems="center">
        <Box mr={5} display="flex" flexDir="column">
          <span className={styles.category}>{formattedDate.dayOfWeek}</span>
          <span>{formattedDate.formattedDate}</span>
        </Box>
        <Box display="flex" flexDir="column">
          <span className={styles.category}>{category}</span>
          <span className={styles.title}>{title}</span>
        </Box>
      </Flex>
      <span className={amount > 0 ? styles.plusAmount : styles.minusAmount}>
        {convertDollarsToString(amount)}
      </span>
      <PopUpModal isNewItem={false} data={data} index={index} open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  )
}

export default TableItem
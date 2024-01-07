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
  tags: string[];
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

  const { category, title, amount, date, type, budget, tags } = data;
  const formattedDate = convertDate(date);
  return (
    <Box className={styles.itemWrapper} onClick={() => setModalOpen(true)} width="100%">
      <Flex alignItems="center" width="92%">
        <Box mr={5} display="flex" flexDir="column" justifyContent="center" width="10%">
          <span className={styles.label}>{formattedDate.dayOfWeek}</span>
          <span className={styles.date}>{formattedDate.formattedDate}</span>
        </Box>
        <Box mr={5} display="flex" flexDir="column" justifyContent="center" width="20%">
          <span className={styles.label}>{category}</span>
          <span className={styles.title}>{title}</span>
        </Box>
        <Box mr={5} display="flex" flexDir="column" justifyContent="center" width="15%">
          <span className={styles.label}>Expense Type</span>
          <span>{type}</span>
        </Box>
        <Box display="flex" flexDir="column" justifyContent="center" width="15%">
          <span className={styles.label}>Budget Type</span>
          <span>{budget ? budget : "N/A"}</span>
        </Box>
        <Box display="flex" flexDir="column" justifyContent="center" width="40%">
          <span className={styles.label}>Tags</span>
          {tags && tags.length ?
            <Flex flexWrap="wrap">
              {tags.map((tag: string) => <Box key={tag + 'tag'} className={styles.tag}>{tag}</Box>)}
            </Flex>
            : "N/A"}
        </Box>
      </Flex>
      <Box width="8%">
        <div className={amount > 0 ? styles.plusAmount : styles.minusAmount}>
          <span className={styles.label}>Amount</span>
          <span>{convertDollarsToString(amount)}</span>
        </div>
      </Box>
      <PopUpModal isNewItem={false} data={data} index={index} open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  )
}

export default TableItem
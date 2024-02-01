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
  isCondensed: boolean;
  convertDate: Function;
}

const TableItem = ({ data, index, isCondensed, convertDate }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { category, title, amount, date, type, budget, tags } = data;
  const formattedDate = convertDate(date);
  return (
    <Box className={styles.itemWrapper} padding={isCondensed ? '5px 20px' : '20px'} onClick={() => setModalOpen(true)} width="100%">
      <Flex alignItems="center" width="92%">
        <Box mr={5} display="flex" flexDir="column" justifyContent="center" width="35%">
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
        <Box display="flex" flexDir="column" justifyContent="center" width="35%">
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
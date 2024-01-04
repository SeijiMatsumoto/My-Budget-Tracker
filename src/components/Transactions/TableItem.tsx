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

  const { category, title, amount } = data;
  return (
    <Box className={styles.itemWrapper} onClick={() => setModalOpen(true)}>
      <Flex flexDir="row">
        <span className={styles.category}>{category}</span>
        <span className={styles.title}>{title}</span>
      </Flex>
      <span className={amount > 0 ? styles.plusAmount : styles.minusAmount}>
        {convertDollarsToString(amount)}
      </span>
      <PopUpModal isNewItem={false} data={data} index={index} open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  )
}

export default TableItem
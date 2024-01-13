"use client"
import {
  Flex,
  Button,
  Text,
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import styles from '@/styles/Settings/settings.module.scss'
import { useMyDataContext } from '@/contexts/DataContext'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { setDataInFirestore } from '@/data/useFirebase'
import { useAuth } from '@/contexts/AuthContext'
import { returnToast } from '@/utils/returnToast';
import RecurringModal from './RecurringNewModal'

type Props = {
  item: string;
  index: number;
  innerIndex: number;
  open: boolean;
  onClose: () => void;
}

const RecurringItem = ({ item, index, innerIndex, open, onClose }: Props) => {
  const { user } = useAuth();
  const toast = useToast()
  const { recurringData, setRecurringData } = useMyDataContext();

  return (
    <Flex key={item + index} className={styles.category} flexDir="row" justifyContent="space-between" alignItems="center">
      <Text>
        {item}
      </Text>
    </Flex>
  )
}

export default RecurringItem
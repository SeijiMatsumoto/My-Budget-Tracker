"use client";
import React from 'react'
import DateRange from './Filters/DateRange'
import { CardHeader, Flex } from '@chakra-ui/react';
import Type from './Filters/Type';
import Budget from './Filters/Budget';
import Search from './Filters/Search';
import SortButton from './Filters/SortButton';
import { useMyDataContext } from '@/contexts/DataContext';

interface SortConfig {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
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

interface Props {
  sortConfig: SortConfig;
  setSortConfig: Function;
}

const Filters = ({ sortConfig, setSortConfig }: Props) => {
  const { handleSort } = useMyDataContext();

  return (
    <CardHeader justifyContent="space-between" display="flex" flexDir="row">
      <DateRange />
      <Flex mb={3}>
        <Search />
        <Type />
        <Budget />
        <SortButton sortConfig={sortConfig} setSortConfig={setSortConfig} handleSort={handleSort} />
      </Flex>
    </CardHeader>
  )
}

export default Filters
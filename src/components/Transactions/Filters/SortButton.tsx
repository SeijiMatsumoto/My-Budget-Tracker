"use client"
import { Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

type Props = {
  handleSort: Function;
  sortConfig: SortConfig;
  setSortConfig: Function;
}

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

const SortButton = ({ handleSort, sortConfig, setSortConfig }: Props) => {
  const [sortType, setSortType] = useState<string | null>(null);

  const sortAction = (type: string) => {
    handleSort(sortConfig, setSortConfig, type);
    setSortType(type[0].toUpperCase() + type.slice(1));
  }

  return (
    <Box mr={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
          {sortType ? `Sort by ${sortType}` : "Sort"}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => sortAction("amount")}>Amount</MenuItem>
          <MenuItem onClick={() => sortAction('date')}>Date</MenuItem>
          <MenuItem onClick={() => sortAction('title')}>Title</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default SortButton
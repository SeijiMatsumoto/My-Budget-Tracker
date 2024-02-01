"use client"
import { Box, Button, Menu, MenuButton, MenuList, MenuItem, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

type Props = {
  handleSort: Function;
  sortConfig: SortConfig;
  setSortConfig: Function;
  isDrawer: boolean;
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

const SortButton = ({ handleSort, sortConfig, setSortConfig, isDrawer }: Props) => {
  const [sortType, setSortType] = useState<string | null>(null);

  const sortAction: any = (type: string) => {
    handleSort(sortConfig, setSortConfig, type);
    setSortType(type[0].toUpperCase() + type.slice(1));
  }

  return (
    <Box mr={isDrawer ? 0 : 4}>
      {isDrawer && <Heading size="md" mb={1}>Sort by</Heading>}
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} width="100%">
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
"use client"
import React from 'react'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';
import { FaChevronDown } from "react-icons/fa";

const Type = () => {
  const { type, setType } = useMyDataContext();

  return (
    <Box mr={4}>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} width="100%">
          {type === 'All' ? 'Expense type' : type}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setType("All")}>All</MenuItem>
          <MenuItem onClick={() => setType('Transaction')}>Transaction</MenuItem>
          <MenuItem onClick={() => setType('Income')}>Income</MenuItem>
          <MenuItem onClick={() => setType('Savings')}>Savings</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Type
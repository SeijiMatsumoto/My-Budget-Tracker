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
const Budget = () => {
  const { budgetType, setBudgetType } = useMyDataContext();

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} width="100%">
          {budgetType}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setBudgetType("All")}>All</MenuItem>
          <MenuItem onClick={() => setBudgetType('Needs')}>Needs</MenuItem>
          <MenuItem onClick={() => setBudgetType('Wants')}>Wants</MenuItem>
          <MenuItem onClick={() => setBudgetType('Savings')}>Savings</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Budget
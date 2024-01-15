"use client"
import React from 'react'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Heading
} from '@chakra-ui/react'
import { useMyDataContext } from '@/contexts/DataContext';
import { FaChevronDown } from "react-icons/fa";

interface Props {
  isDrawer: boolean;
}

const Budget = ({ isDrawer }: Props) => {
  const { budgetType, setBudgetType } = useMyDataContext();

  return (
    <Box mr={isDrawer ? 0 : 4} mb={isDrawer ? 5 : 0}>
      {isDrawer && <Heading size="md" mb={1}>Budget Type</Heading>}
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} width="100%">
          {budgetType === 'All' ? 'Budget type' : budgetType}
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
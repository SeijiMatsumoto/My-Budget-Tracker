import React from 'react'
import DateRange from './Filters/DateRange'
import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { FaPlusCircle } from "react-icons/fa";
import Search from './Filters/Search';
import Type from './Filters/Type';

const Filters = () => {
  const { setNewItemModalOpen } = useMyNavigationContext();

  return (
    <Flex flexDir="column">
      <Box mb={10}>
        <Button
          width="100%"
          height="80px"
          onClick={() => setNewItemModalOpen(true)}
        >
          <Icon as={FaPlusCircle} mr="5px" />
          Add new transaction or income
        </Button>
      </Box>
      <Box mb={10}>
        <Heading size="sm" mb={3}>Search</Heading>
        <Search />
      </Box>
      <Box mb={10}>
        <Heading size="sm" mb={3}>Date Range</Heading>
        <DateRange />
      </Box>
      <Box mb={10}>
        <Heading size="sm" mb={3}>Type</Heading>
        <Type />
      </Box>
    </Flex>
  )
}

export default Filters
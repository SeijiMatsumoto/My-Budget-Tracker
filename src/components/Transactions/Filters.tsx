import React from 'react'
import DateRange from './Filters/DateRange'
import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { FaPlusCircle } from "react-icons/fa";
import Search from './Filters/Search';
import Type from './Filters/Type';

type Props = {
  startDate: Date;
  endDate: Date;
  setStartDate: Function;
  setEndDate: Function;
  searchInput: {
    input: string;
    type: string;
  };
  setInput: Function;
  type: string;
  setType: (nextValue: string) => void;
}

const Filters = ({ startDate, endDate, setStartDate, setEndDate, searchInput, setInput, type, setType }: Props) => {
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
        <Search searchInput={searchInput} setInput={setInput} />
      </Box>
      <Box mb={10}>
        <Heading size="sm" mb={3}>Date Range</Heading>
        <DateRange startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      </Box>
      <Box mb={10}>
        <Heading size="sm" mb={3}>Type</Heading>
        <Type type={type} setType={setType} />
      </Box>
    </Flex>
  )
}

export default Filters
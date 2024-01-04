"use client";
import React, { useState } from 'react'
import DateRange from './Filters/DateRange'
import { Box, Button, Flex, Heading, Icon } from '@chakra-ui/react';
import { FaPlusCircle } from "react-icons/fa";
import Search from './Filters/Search';
import Type from './Filters/Type';
import Budget from './Filters/Budget';
import PopUpModal from '../Modal/PopUpModal';

const Filters = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Flex flexDir="column">
      <Box mb={10}>
        <Button
          width="100%"
          height="80px"
          onClick={() => setModalOpen(true)}
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
      <Box mb={10}>
        <Heading size="sm" mb={3}>Budget</Heading>
        <Budget />
      </Box>
      <PopUpModal isNewItem={true} data={null} index={0} open={modalOpen} onClose={() => setModalOpen(false)} />
    </Flex>
  )
}

export default Filters
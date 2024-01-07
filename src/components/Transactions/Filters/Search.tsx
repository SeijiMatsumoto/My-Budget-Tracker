"use client"
import { Flex, Input } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';

const Search = () => {
  const { searchInput, setSearchInput } = useMyDataContext();

  return (
    <Flex flexDir="column" mr={4} width="300px">
      <Input
        htmlSize={4}
        placeholder="Search for title, category, or tag"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        mr={2}
      />
    </Flex>
  )
}

export default Search
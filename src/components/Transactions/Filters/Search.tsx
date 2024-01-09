"use client"
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';
import { SearchIcon } from '@chakra-ui/icons';
const Search = () => {
  const { searchInput, setSearchInput } = useMyDataContext();

  return (
    <Flex flexDir="column" mr={4} width="310px">
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          htmlSize={4}
          placeholder="Search for title, category, or tag"
          value={searchInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
          mr={2}
        />
      </InputGroup>

    </Flex>
  )
}

export default Search
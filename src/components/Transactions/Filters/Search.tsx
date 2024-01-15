"use client"
import { Flex, Heading, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { ChangeEvent } from 'react'
import { useMyDataContext } from '@/contexts/DataContext';
import { SearchIcon } from '@chakra-ui/icons';

interface Props {
  isDrawer: boolean;
}

const Search = ({ isDrawer }: Props) => {
  const { searchInput, setSearchInput } = useMyDataContext();

  return (
    <Flex flexDir="column" mr={isDrawer ? 0 : 4} width={isDrawer ? "100%" : "310px"} mb={isDrawer ? 5 : 0}>
      {isDrawer && <Heading size="md" mb={1}>Search</Heading>}
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
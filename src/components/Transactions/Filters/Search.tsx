"use client"
import { Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'

type Props = {
  searchInput: {
    input: string;
    type: string;
  };
  setInput: Function;
}

const Search = ({ searchInput, setInput }: Props) => {
  const [type, setType] = useState<string>("title");

  return (
    <Flex flexDir="column">
      <RadioGroup onChange={setType} value={type} mb={2}>
        <Stack direction="row">
          <Radio value="title">Title</Radio>
          <Radio value="category">Category</Radio>
        </Stack>
      </RadioGroup>
      <Input
        htmlSize={4}
        width='100%'
        placeholder={`Search for transaction ${type.toLowerCase()}`}
        value={searchInput.input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({ input: e.target.value.toLowerCase(), type: "" })}
        mr={2}
      />
    </Flex>
  )
}

export default Search
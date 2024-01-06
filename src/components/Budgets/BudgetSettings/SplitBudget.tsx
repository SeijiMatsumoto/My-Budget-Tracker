"use client"
import {
  Box,
  Text,
  Flex,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const SplitBudget = () => {
  const [needsValue, setNeedsValue] = useState<number>(50)
  const [wantsValue, setWantsValue] = useState<number>(30)
  const [savingsValue, setSavingsValue] = useState<number>(20)
  const [isValid, setIsValid] = useState<boolean>(true);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  useEffect(() => {
    const sum = needsValue + wantsValue + savingsValue;
    setIsValid(sum === 100)
  }, [needsValue, wantsValue, savingsValue])

  return (
    <Flex flexDir="column">
      <Heading size="sm">Split Budget</Heading>
      <Text>Note: The most ideal split is 50/30/20.</Text>
      <Flex flexDir="column">
        <Box pt={6} pb={2} mt={5}>
          <Heading size="xs">Needs</Heading>
          <Slider aria-label='slider-ex-6' value={needsValue} onChange={(val) => setNeedsValue(val)}>
            <SliderMark value={25} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark
              value={needsValue}
              textAlign='center'
              bg='blue.500'
              color='white'
              mt='-10'
              ml='-5'
              w='12'
            >
              {needsValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box pt={6} pb={2} mt={5}>
          <Heading size="xs">Wants</Heading>
          <Slider aria-label='slider-ex-6' value={wantsValue} onChange={(val) => setWantsValue(val)}>
            <SliderMark value={25} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark
              value={wantsValue}
              textAlign='center'
              bg='blue.500'
              color='white'
              mt='-10'
              ml='-5'
              w='12'
            >
              {wantsValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Box pt={6} pb={2} mt={5}>
          <Heading size="xs">Savings</Heading>
          <Slider aria-label='slider-ex-6' value={savingsValue} onChange={(val) => setSavingsValue(val)}>
            <SliderMark value={25} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark
              value={savingsValue}
              textAlign='center'
              bg='blue.500'
              color='white'
              mt='-10'
              ml='-5'
              w='12'
            >
              {savingsValue}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Flex>
    </Flex>)
}

export default SplitBudget
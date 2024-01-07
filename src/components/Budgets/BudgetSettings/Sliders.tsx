"use client"
import {
  Box,
  Flex,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

type Props = {
  title: string;
  value: number;
  index: number;
  onChange: Function;
}

const Sliders = ({ title, value, index, onChange }: Props) => {
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }

  return (
    <Box pt={6} pb={2} mt={5}>
      <Heading size="xs">{title}</Heading>
      <Flex>
        <Slider aria-label='slider-ex-6' value={value} onChange={(val) => onChange(val, index)}>
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
            value={value}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {value}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </Box>
  )
}

export default Sliders
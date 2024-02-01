// Calculator.tsx

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Text,
} from '@chakra-ui/react';

interface Props {
  setAmount: Function;
}

const Calculator = ({ setAmount }: Props) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input).toFixed(2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  useEffect(() => {
    if (result.length && result !== 'Error') {
      setAmount(parseFloat(result).toFixed(2));
    }
  }, [result])

  return (
    <Container centerContent>
      <Box mt={2} p={5} borderRadius="lg">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter expression"
          textAlign="right"
          mb={2}
          autoComplete="off"
        />
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {['7', '8', '9', '/'].map((value) => (
            <Button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </Button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <Button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </Button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <Button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </Button>
          ))}
          {['0', '.', '=', '+'].map((value) => (
            <Button
              key={value}
              onClick={value === '=' ? handleCalculate : () => handleButtonClick(value)}
            >
              {value}
            </Button>
          ))}
        </Grid>
        <Button mt={2} width="100%" colorScheme="red" onClick={handleClear}>
          Clear
        </Button>
        {result && <Text mt={2}>Result: {result}</Text>}
      </Box>
    </Container>
  );
};

export default Calculator;

import React from 'react'
import styles from '@/styles/Login/login.module.scss'
import {
  Box,
  Heading,
  VStack,
  Flex,
  Text
} from '@chakra-ui/react';
import GoogleLoginButton from './GoogleLoginButton';
import { Image } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex className={styles.wrapper}>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={10}
        boxShadow="lg"
      >
        <VStack spacing={4}>
          <Image src='https://i.imgur.com/1De81No.png' alt='logo' />
          <Text mt={-5}>Take control of your spending</Text>
          <GoogleLoginButton />
          <Text fontSize={10}>Connect to your account to see your data.</Text>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Login
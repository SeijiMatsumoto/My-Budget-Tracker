"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/topNav.module.scss'
import { Flex, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';

type Props = {}

function TopNav({ }: Props) {
  const { page } = useMyNavigationContext();

  return (
    <Flex
      className={styles.wrapper}
      justifyContent="space-between"
    >
      <Heading size={"lg"} fontWeight={300} textTransform="uppercase">{page}</Heading>
      <Link href="/settings">
        <Image src="https://i.imgur.com/2BkToy2.jpeg" alt={''} h={10} w={10} borderRadius={50} objectFit="cover" />
      </Link>
    </Flex>
  )
}

export default TopNav
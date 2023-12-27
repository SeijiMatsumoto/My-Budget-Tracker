"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/topNav.module.scss'
import { Flex, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';
import { Skeleton } from '@chakra-ui/react'

type Props = {}

function TopNav({ }: Props) {
  const { page, menuExpanded } = useMyNavigationContext();

  return (
    <Flex
      className={styles.wrapper}
      justifyContent="space-between"
      width={`calc(100vw - ${menuExpanded ? '300px' : '80px'})`}
    >
      <Heading size={"lg"} fontWeight={300} textTransform="uppercase">
        <Skeleton isLoaded={page.length}>
          {page}
        </Skeleton>
      </Heading>
      <Link href="/settings">
        <Image src="https://i.imgur.com/2BkToy2.jpeg" alt={''} h={10} w={10} borderRadius={50} objectFit="cover" />
      </Link>
    </Flex>
  )
}

export default TopNav
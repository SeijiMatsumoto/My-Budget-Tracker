"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/topNav.module.scss'
import { Flex, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';
import { Skeleton } from '@chakra-ui/react'
import useIsMobile from '@/hooks/useIsMobile';

function TopNav() {
  const { page, menuExpanded } = useMyNavigationContext();
  const isMobile = useIsMobile();

  return (
    <Flex
      className={styles.wrapper}
      justifyContent="space-between"
      width={isMobile ? '100vw' : `calc(100vw - ${menuExpanded ? '250px' : '80px'})`}
      padding={isMobile ? '10px 15px' : '15px 25px'}
      height={isMobile ? '50px' : '80px'}
    >
      <Heading size={'lg'} fontWeight={300} textTransform='uppercase'>
        <Skeleton isLoaded={page.length}>
          {page}
        </Skeleton>
      </Heading>
      <Link href='/settings'>
        <Image src='https://i.imgur.com/2BkToy2.jpeg' alt={''} h={isMobile ? 8 : 10} w={isMobile ? 8 : 10} borderRadius={50} objectFit='cover' />
      </Link>
    </Flex>
  )
}

export default TopNav
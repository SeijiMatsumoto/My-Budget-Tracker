"use client";
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext';
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/topNav.module.scss'
import { Flex, Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Skeleton } from '@chakra-ui/react'
import useIsMobile from '@/hooks/useIsMobile';
import UserModal from '../Modal/UserModal';

function TopNav() {
  const { user, showPhoto } = useAuth();
  const { page, menuExpanded } = useMyNavigationContext();
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (!user) return null;

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
      <Image src={showPhoto ? user.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'} alt='profile image' h={isMobile ? 8 : 10} w={isMobile ? 8 : 10} borderRadius={50} objectFit='cover' cursor="pointer" onClick={() => setOpenModal(true)} backgroundColor="#D9D9D9" />
      <UserModal open={openModal} onClose={() => setOpenModal(false)} />
    </Flex>
  )
}

export default TopNav
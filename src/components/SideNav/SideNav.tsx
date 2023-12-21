'use client'
import React from 'react'
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Flex, Heading } from '@chakra-ui/react';
import Links from './Links';
import { MdOutlineSmartToy } from 'react-icons/md';

type Props = {}

export default function SideNav({ }: Props) {

  return (
    <header className={styles.wrapper}>
      <Heading size={'md'} mt={"10px"} className={styles.heading}>
        <MdOutlineSmartToy className={styles.icon} />
        CJ Finances
      </Heading>
      <Links />
    </header>
  )
}

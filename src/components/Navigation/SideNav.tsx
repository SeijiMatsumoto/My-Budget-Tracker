"use client";
import React from 'react'
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Heading, Icon } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";

type Props = {}

export default function SideNav({ }: Props) {

  return (
    <header className={styles.wrapper}>
      <Heading size={'md'} mt={"10px"} className={styles.heading}>
        <Icon as={GiHummingbird} className={styles.icon} />
        CJ Finances
      </Heading>
      <Links />
    </header>
  )
}

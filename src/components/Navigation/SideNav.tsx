"use client";
import React, { useState } from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Heading, Icon } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function SideNav() {
  const { menuExpanded, setMenuExpanded } = useMyNavigationContext();

  return (
    <header className={[styles.wrapper, menuExpanded ? styles.expanded : styles.collapsed].join(" ")}>
      <Heading size={'md'} mt={"10px"} className={styles.heading}>
        <Icon as={GiHummingbird} className={styles.icon} />
        {menuExpanded && "CJ Fin"}
      </Heading>
      <Links menuExpanded={menuExpanded} />
      <div className={styles.drawer} onClick={() => setMenuExpanded(!menuExpanded)}>
        <Icon as={menuExpanded ? MdArrowBackIosNew : MdArrowForwardIos} />
      </div>
    </header>
  )
}

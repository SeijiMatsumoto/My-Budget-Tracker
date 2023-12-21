"use client";
import React, { useState } from 'react'
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Heading, Icon } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);

  return (
    <header className={[styles.wrapper, expanded ? styles.expanded : styles.collapsed].join(" ")}>
      <Heading size={'md'} mt={"10px"} className={styles.heading}>
        <Icon as={GiHummingbird} className={styles.icon} />
        {expanded && "CJ Fin"}
      </Heading>
      <Links expanded={expanded} />
      <div
        className={styles.drawer}
        onClick={() => setExpanded(!expanded)}
      >
        <Icon as={expanded ? MdArrowBackIosNew : MdArrowForwardIos} />
      </div>
    </header>
  )
}

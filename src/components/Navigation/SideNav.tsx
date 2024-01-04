"use client";
import React, { useState } from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Heading, Icon } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import PopUpModal from '../Modal/PopUpModal';

export default function SideNav() {
  const { menuExpanded, setMenuExpanded } = useMyNavigationContext();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className={[styles.wrapper, menuExpanded ? styles.expanded : styles.collapsed].join(" ")}>
      <div className={[styles.top, menuExpanded ? styles.topExpanded : styles.topCollapsed].join(" ")}>
        <Heading size={'md'} mt={"10px"} className={styles.heading}>
          <Icon as={GiHummingbird} className={styles.icon} />
          {menuExpanded && "CJ Fin"}
        </Heading>
        <Links menuExpanded={menuExpanded} />
        <div className={styles.drawer} onClick={() => setMenuExpanded(!menuExpanded)}>
          <Icon as={menuExpanded ? MdArrowBackIosNew : MdArrowForwardIos} />
        </div>
      </div>
      <button
        className={menuExpanded ? styles.button : styles.buttonCollapsed}
        onClick={() => setModalOpen(true)}
      >
        <Icon as={FaPlusCircle} />
        {menuExpanded ? <span>Add new expense</span> : null}
      </button>
      <PopUpModal isNewItem={true} data={null} index={0} open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  )
}

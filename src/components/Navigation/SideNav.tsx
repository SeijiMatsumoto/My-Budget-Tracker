"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '../../styles/Navigation/sideNav.module.scss'
import { Heading, Icon } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import NewItemModal from './NewItemModal';

export default function SideNav() {
  const { menuExpanded, setMenuExpanded, newItemModalOpen, setNewItemModalOpen } = useMyNavigationContext();

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
        onClick={() => setNewItemModalOpen(true)}
      >
        <Icon as={FaPlusCircle} />
        {menuExpanded ? <span>Add new expense</span> : null}
      </button>
      <NewItemModal open={newItemModalOpen} onClose={() => setNewItemModalOpen(false)} />
    </header>
  )
}

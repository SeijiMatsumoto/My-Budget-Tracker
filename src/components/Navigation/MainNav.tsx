"use client";
import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext';
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import styles from '@/styles/Navigation/sideNav.module.scss'
import mobileStyles from '@/styles/Navigation/bottomNav.module.scss'
import { Heading, Icon, Image } from '@chakra-ui/react';
import Links from './Links';
import { GiHummingbird } from "react-icons/gi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import PopUpModal from '../Modal/PopUpModal';
import useIsMobile from '@/hooks/useIsMobile';
import MobileLinks from './MobileLinks';

export default function MainNav() {
  const { user } = useAuth();
  const { menuExpanded, setMenuExpanded } = useMyNavigationContext();
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!user) return null;

  const SideNav = () => {
    return (
      <header className={[styles.wrapper, menuExpanded ? styles.expanded : styles.collapsed].join(" ")}>
        <div className={[styles.top, menuExpanded ? styles.topExpanded : styles.topCollapsed].join(" ")}>
          <Heading size={'md'} className={styles.heading}>
            <Icon as={GiHummingbird} className={styles.icon} />
            {menuExpanded && <Image src="https://i.imgur.com/1De81No.png" alt="logo" width="100px" />}
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

  const BottomNav = () => {
    return (
      <header className={mobileStyles.wrapper}>
        <MobileLinks />
      </header>
    )
  }

  return (
    <>
      {isMobile ? BottomNav() : SideNav()}
    </>
  )

}

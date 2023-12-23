"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { Flex, Icon } from '@chakra-ui/react';
import styles from '../../styles/Navigation/links.module.scss'
import { links } from '@/data/links'
import { Link } from '@chakra-ui/next-js';

interface Props {
  menuExpanded: boolean;
}

function Links({ menuExpanded }: Props) {
  const { page, setPage } = useMyNavigationContext();

  return (
    <Flex mt="50px" flexDir={"column"} fontSize={16} className={!menuExpanded ? styles.collapsed : ""}>
      {links.map((link, i) => {
        return (
          <Flex key={link.title + i} flexDir={"column"} className={!menuExpanded ? styles.collapsed : ""}>
            {menuExpanded && <h4 className={styles.heading}>{link.title}</h4>}
            {link.children.map((child, j) => {
              return (
                <Link
                  key={child.title + j}
                  href={child.href}
                  className={[styles.link, page.toLowerCase() === child.title.toLowerCase() ? styles.active : "", !menuExpanded ? styles.collapsed : ""].join(" ")}
                  onClick={() => setPage(child.title)}
                  paddingX={menuExpanded ? "10px" : "0"}
                >
                  <Icon as={child.icon} className={menuExpanded ? styles.iconExpanded : styles.iconCollapsed} />
                  {menuExpanded && child.title}
                </Link>
              )
            })}
            {i !== links.length - 1 ? <hr className={styles.line} /> : null}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Links
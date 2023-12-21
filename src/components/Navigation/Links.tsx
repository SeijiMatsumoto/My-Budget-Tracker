"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { Flex, Icon } from '@chakra-ui/react';
import styles from '../../styles/Navigation/links.module.scss'
import { links } from '@/data/links'
import { Link } from '@chakra-ui/next-js';

interface Props {
  expanded: boolean;
}

function Links({ expanded }: Props) {
  const { page, setPage } = useMyNavigationContext();

  return (
    <Flex mt="50px" flexDir={"column"} fontSize={16} className={!expanded ? styles.collapsed : ""}>
      {links.map((link, i) => {
        return (
          <Flex key={link.title + i} flexDir={"column"} className={!expanded ? styles.collapsed : ""}>
            {expanded && <h4 className={styles.heading}>{link.title}</h4>}
            {link.children.map((child, j) => {
              return (
                <Link
                  key={child.title + j}
                  href={child.href}
                  className={[styles.link, page.toLowerCase() === child.title.toLowerCase() ? styles.active : "", !expanded ? styles.collapsed : ""].join(" ")}
                  onClick={() => setPage(child.title)}
                  paddingX={expanded ? "10px" : "0"}
                >
                  <Icon as={child.icon} className={expanded ? styles.iconExpanded : styles.iconCollapsed} />
                  {expanded && child.title}
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
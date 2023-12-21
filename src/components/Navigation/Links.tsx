"use client";
import React from 'react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { Flex, Icon } from '@chakra-ui/react';
import styles from '../../styles/Navigation/links.module.scss'
import { links } from '@/data/links'
import { Link } from '@chakra-ui/next-js';

function Links() {
  const { page, setPage } = useMyNavigationContext();

  return (
    <Flex mt="50px" flexDir={"column"} fontSize={16}>
      {links.map((link, i) => {
        return (
          <Flex key={link.title + i} flexDir={"column"} className={styles.category}>
            <h4 className={styles.heading}>{link.title}</h4>
            {link.children.map((child, j) => {
              return (
                <Link
                  key={child.title + j}
                  href={child.href}
                  className={[styles.link, page.toLowerCase() === child.title.toLowerCase() ? styles.active : ""].join(" ")}
                  onClick={() => setPage(child.title)}
                >
                  <Icon as={child.icon} className={styles.icon} />
                  {child.title}
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
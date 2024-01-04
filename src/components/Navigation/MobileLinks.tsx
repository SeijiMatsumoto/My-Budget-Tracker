import { Flex, Icon, Text } from '@chakra-ui/react'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import React from 'react'
import { mobileLinks } from '@/data/links'
import { Link } from '@chakra-ui/next-js'
import styles from '@/styles/Navigation/bottomNav.module.scss'

type Props = {}

const MobileLinks = (props: Props) => {
  const { page, setPage } = useMyNavigationContext();

  return (
    <Flex width="100%" justifyContent={"space-evenly"}>
      {mobileLinks.map((link, i) => {
        return (
          <Link
            key={link.href + i}
            href={link.href}
            className={[styles.menuLink, page === link.title ? styles.active : ""].join(" ")}
            onClick={() => setPage(link.title)}
            padding="10px"
          >
            <Icon as={link.icon} className={styles.icon} />
            <Text className={styles.label}>{link.title}</Text>
          </Link>
        )
      })}
    </Flex>
  )
}

export default MobileLinks
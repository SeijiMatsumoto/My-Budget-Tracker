import React from 'react'
import styles from '../../styles/Navigation/topNav.module.scss'
import { Flex } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

type Props = {}

function TopNav({ }: Props) {
  return (
    <Flex
      className={styles.wrapper}
      justifyContent="flex-end"
    >
      <Image src="https://i.imgur.com/2BkToy2.jpeg" alt={''} h={10} w={10} borderRadius={50} m={5} objectFit="cover" />
    </Flex>
  )
}

export default TopNav
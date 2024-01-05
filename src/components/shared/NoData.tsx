import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { WarningIcon } from '@chakra-ui/icons'

const NoData = () => {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Icon as={WarningIcon} mr={2} w={4} h={4} />
      <Text fontSize="16px">There is no data yet.</Text>
    </Flex>
  )
}

export default NoData
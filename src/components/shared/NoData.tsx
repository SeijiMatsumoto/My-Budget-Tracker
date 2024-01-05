import { Flex, Icon } from '@chakra-ui/react';
import React from 'react'
import { PiSealWarningBold } from "react-icons/pi";

const NoData = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Icon as={PiSealWarningBold} />
      There is no data yet.
    </Flex>
  )
}

export default NoData
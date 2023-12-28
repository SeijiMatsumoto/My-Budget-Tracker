import React from 'react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from '@chakra-ui/react';
import { userData } from '@/data/dummyData/user';

type Props = {}

const Overview = (props: Props) => {
  const newDate = new Date();

  return (
    <Card mr={5} width={'15%'}>
      <CardHeader>
        <Heading size="md">
          Overview
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size="md" fontWeight={"normal"}>Hello, {userData.fullName}</Heading>
        <Text>Today is {newDate.toDateString()}</Text>
        {/*

        */}
      </CardBody>
    </Card>
  )
}

export default Overview
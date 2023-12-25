"use client"
import React from 'react'
import { Card, CardHeader, CardBody, Flex, CardFooter, Heading } from '@chakra-ui/react'
import { PieChart } from '@mui/x-charts/PieChart';

function Budgets() {
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <Card display="flex" flex={1} ml={5}>
      <CardHeader>
        <Heading size="md">
          {monthNames[date.getMonth()]}'s Budget
        </Heading>
      </CardHeader>
      <CardBody>
        <Flex flexDir="column">
          <Heading size="small">50/30/20</Heading>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 2500, label: 'Needs' },
                  { id: 1, value: 800, label: 'Wants' },
                  { id: 2, value: 1000, label: 'Savings' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Budgets
"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { spendingData } from '@/data/overview'
import { getWeeksInMonthWithDateRanges } from '@/utils/getDates'

function Overview() {
  const [tableSize, setTableSize] = useState("sm");
  const date = new Date();
  const weeks = getWeeksInMonthWithDateRanges(date.getFullYear(), date.getMonth() + 1);

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 2400) setTableSize("lg");
    else if (width > 1920) setTableSize("md");
    else setTableSize("sm")
  }, [])

  return (
    <Card className={styles.card}>
      <CardHeader>
        <Heading size="md">
          Spending Overview
        </Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="striped" size={tableSize}>
            <TableCaption>Amount spent in past month</TableCaption>
            <Thead>
              <Tr>
                <Th>Time Frame</Th>
                <Th isNumeric>Total Spent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {spendingData.map((row, i) => {
                return (
                  <Tr key={row.time + i}>
                    <Td>{`${row.time} (${weeks[i]})`}</Td>
                    <Td isNumeric>${row.total}</Td>
                  </Tr>
                )
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total Spent</Th>
                <Th isNumeric fontSize="16px">${spendingData.reduce((a, b) => a + b.total, 0).toFixed(2)}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default Overview
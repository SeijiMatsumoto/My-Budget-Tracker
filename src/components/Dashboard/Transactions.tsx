"use client"
import React from 'react'
import { Card, CardHeader, CardBody, Heading, Button } from '@chakra-ui/react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { transactions } from '@/data/transactions'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type Props = {}

function Transactions({ }: Props) {
  const router = useRouter()
  const { setPage } = useMyNavigationContext();

  const clickHandler = () => {
    setPage('Transactions');
    router.push('/transactions');
  }

  return (
    <Card className={styles.card} height={"48%"} mt={5}>
      <CardHeader className={styles.heading}>
        <Heading size="md">
          Recent Transactions
        </Heading>
        <Button variant="outline" backgroundColor='#0088cc' color="white" size="sm" onClick={clickHandler}>
          View More
        </Button>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>Last 10 transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Transaction</Th>
                <Th>Category</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.slice(0, 10).map((row, i) => {
                return (
                  <Tr key={row.title + i}>
                    <Td>{row.title}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.date}</Td>
                    <Td>{row.amount}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default Transactions
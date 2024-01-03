"use client"
import React from 'react'
import { Card, CardHeader, CardBody, Heading, Button } from '@chakra-ui/react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { useMyDataContext } from '@/contexts/DataContext';
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
import { convertDollarsToString } from '@/utils/convertDollars';

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
}

function Transactions() {
  const router = useRouter()
  const { setPage } = useMyNavigationContext();
  const { transactionsData } = useMyDataContext();

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
        <Button backgroundColor='#0088cc' color="white" size="sm" onClick={clickHandler}>
          View All
        </Button>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <TableContainer>
          <Table variant="striped" size="sm">
            {transactionsData.length ? <TableCaption>Last 10 transactions</TableCaption>
              : <TableCaption>No transactions found.</TableCaption>}
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>Title</Th>
                <Th>Budget</Th>
                <Th>Category</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[...transactionsData].slice(0, 10).map((row: Transaction, i: number) => {
                return (
                  <Tr key={row.title + i}>
                    <Td>{row.type}</Td>
                    <Td>{row.title}</Td>
                    <Td>{row.budget}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.date}</Td>
                    <Td>{convertDollarsToString(row.amount)}</Td>
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
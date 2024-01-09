"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Dashboard/dashboard.module.scss';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
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
import { getWeeksInMonthWithDateRanges } from '@/utils/getDates'
import { useMyDataContext } from '@/contexts/DataContext';
import NoData from '../shared/NoData';

interface DataByWeek {
  week: string;
  totalAmount: number;
}

interface Transaction {
  amount: number;
  date: string;
  type: string;
}

interface WeeklySum {
  week: string;
  totalAmount: number;
}

function Spending() {
  const { dataToShow } = useMyDataContext();
  const [tableSize, setTableSize] = useState<string>("sm");
  const [dataByWeek, setDataByWeek] = useState<DataByWeek[]>([]);

  const date = new Date();
  const weeks = getWeeksInMonthWithDateRanges(date.getFullYear(), date.getMonth() + 1);

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 2560) setTableSize("lg");
    else if (width > 1920) setTableSize("md");
    else setTableSize("sm")
  }, [])

  function sumAmountsByWeek(transactions: Transaction[]) {
    const weeklySums: WeeklySum[] = [];
    transactions.forEach((transaction: Transaction) => {
      if (transaction.type !== "Transaction") return;
      const date = new Date(transaction.date);
      const startOfWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const weekKey = startOfWeek.toISOString().split('T')[0];
      const existingWeekIndex = weeklySums.findIndex((week: WeeklySum) => week.week === weekKey);

      if (existingWeekIndex !== -1) {
        weeklySums[existingWeekIndex].totalAmount += transaction.amount;
      } else {
        weeklySums.unshift({ week: weekKey, totalAmount: transaction.amount });
      }
    });

    setDataByWeek(weeklySums);
  }

  return (
    <Card className={styles.card}>
      <CardHeader>
        <Heading size="md">
          Spending
        </Heading>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        {dataToShow ? <TableContainer>
          <Table variant="striped" size={tableSize}>
            <TableCaption>Amount spent in {date.toLocaleString('en-US', { month: 'long' })}</TableCaption>
            <Thead>
              <Tr>
                <Th>Time Frame</Th>
                <Th isNumeric>Total Spent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataByWeek.map((row: DataByWeek, i: number) => {
                return (
                  <Tr key={row.week + i}>
                    <Td>{`Week ${i + 1} (${weeks[i]})`}</Td>
                    <Td isNumeric>${(row.totalAmount * -1).toFixed(2)}</Td>
                  </Tr>
                )
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total Spent</Th>
                <Th isNumeric fontSize="16px">${(dataByWeek.reduce((a: number, b: DataByWeek) => a + b.totalAmount, 0) * -1).toFixed(2)}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer> : <NoData />}
      </CardBody>
    </Card>
  )
}

export default Spending
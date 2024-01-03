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

interface DataByWeek {
  week: string;
  totalAmount: number;
}

interface Transaction {
  amount: number;
  date: string;
  type: string;
}

interface TransactionWithDate {
  amount: number;
  date: Date;
  type: string;
}

function Spending() {
  const { sortedData } = useMyDataContext();
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

  const getWeek = (date: Date): string => {
    const year = date.getFullYear();
    const day = date.getDate();

    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = firstDayOfYear.getDay() - 1;
    const startOfWeek = new Date(year, 0, 1 - daysOffset);

    const weekNumber = Math.ceil(((day - startOfWeek.getDate()) + 1) / 7);
    return `${year}-W${String(weekNumber).padStart(2, '0')}`;
  }

  useEffect(() => {
    const transactionsWithDate: TransactionWithDate[] = sortedData.map((transaction: Transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }));

    const weeklySum: DataByWeek[] = transactionsWithDate.reduce((result: DataByWeek[], transaction: TransactionWithDate) => {
      if (transaction.type === "Transaction") {
        const parsedDate: Date = new Date(transaction.date);
        const week = getWeek(parsedDate);
        const existingWeek = result.find((item) => item.week === week);
        if (existingWeek) {
          existingWeek.totalAmount += transaction.amount;
        } else {
          result.push({
            week,
            totalAmount: transaction.amount,
          });
        }
      }

      return result;
    }, []);

    setDataByWeek(weeklySum);
  }, [sortedData])

  return (
    <Card className={styles.card}>
      <CardHeader>
        <Heading size="md">
          Spending
        </Heading>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <TableContainer>
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
        </TableContainer>
      </CardBody>
    </Card>
  )
}

export default Spending
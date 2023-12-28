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
import { getWeeksInMonthWithDateRanges } from '@/utils/getDates'
import { useMyDataContext } from '@/contexts/DataContext';

interface DataByWeek {
  week: string;
  totalAmount: number;
}

interface Transaction {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

interface TransactionWithDate {
  title: string;
  amount: number;
  category: string;
  date: Date;
  type: string;
}

function Overview() {
  const { transactionsData } = useMyDataContext();
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
    const transactionsWithDate: TransactionWithDate[] = transactionsData.map((transaction: Transaction) => ({
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
  }, [transactionsData])

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

export default Overview
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Flex, Heading, Box, Button, Text } from '@chakra-ui/react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { useRouter } from 'next/navigation'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { useMyDataContext } from '@/contexts/DataContext';

interface Transaction {
  date: string;
  amount: number;
  tags: string[];
  budget: string;
  title: string;
  type: string;
  id: string;
  category: string;
}

interface TransformedData {
  id: number;
  value: number;
  label: string;
}

function Budgets() {
  const date = new Date();

  const valueFormatter = (value: number) => `$${value.toFixed(2)}`;

  const router = useRouter()
  const { setPage } = useMyNavigationContext();
  const { budgetsData, currentMonthData } = useMyDataContext();

  const [chartWidth, setChartWidth] = useState<number>();
  const [chartHeight, setChartHeight] = useState<number>();

  const [chartData, setChartData] = useState<TransformedData[]>([]);
  const [income, setIncome] = useState<number>(0);

  useEffect(() => {
    getWidth();
    getHeight();
    getChartData();
    setIncome(0);
  }, [])

  const getWidth = () => {
    const width = window.innerWidth;
    setChartWidth(width < 1920 ? 280 : 350);
  }

  const getHeight = () => {
    const width = window.innerWidth;
    setChartHeight(width < 1920 ? 300 : 350);
  }

  const clickHandler = () => {
    setPage('Settings');
    router.push('/settings');
  }

  useEffect(() => {
    getChartData();
  }, [currentMonthData])

  const getChartData = () => {
    if (currentMonthData.length) {
      const transformedArray: TransformedData[] = currentMonthData.reduce((accumulator: TransformedData[], currentItem: Transaction) => {
        const budget = currentItem.budget;
        if (currentItem.type === "Income") {
          setIncome(prev => prev + currentItem.amount);
        }

        if (budget && ['Need', 'Want', 'Savings'].includes(budget)) {
          const existingItem = accumulator.find(item => item.label === budget);

          if (existingItem) {
            existingItem.value += Math.abs(currentItem.amount);
          } else {
            accumulator.push({
              id: accumulator.length,
              value: Math.abs(currentItem.amount),
              label: budget,
            });
          }
        }

        return accumulator;
      }, []);
      [transformedArray[0], transformedArray[2]] = [transformedArray[2], transformedArray[0]];
      setChartData(transformedArray)
    }
  }

  return (
    <Card ml={5} className={styles.card}>
      <CardHeader className={styles.heading}>
        <Heading size="md">
          {date.toLocaleString('en-US', { month: 'long' })}'s Budget
        </Heading>
        <Button variant="outline" backgroundColor='#1975a3' color="white" size="sm" onClick={clickHandler}>
          Edit
        </Button>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        <Flex flexDir="row" justifyContent="space-evenly" className={styles.budgetsWrapper}>
          {chartData.length ?
            <Box>
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.label}`,
                    data: chartData
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: '12px'
                  },
                }}
                width={chartWidth}
                height={chartHeight}
                slotProps={{
                  legend: {
                    padding: -10
                  },
                }}
              />
            </Box> : null}
          {chartData.length && budgetsData.length && income > 0 ?
            <Box>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Needs', 'Wants', 'Savings'] }]}
                series={[
                  { data: [chartData[0].value, chartData[1].value, chartData[2].value], label: "Spent", valueFormatter },
                  { data: [budgetsData[0].value / 100 * income, budgetsData[1].value / 100 * income, budgetsData[2].value / 100 * income], label: "Budget", valueFormatter },
                ]}
                height={chartHeight}
              />
              <Text fontSize="12px" ml={5}>Based on this month's net income of ${income.toFixed(2)}</Text>
            </Box> : null}
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Budgets
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Flex, CardFooter, Heading, Box, Button } from '@chakra-ui/react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { budgetData } from '@/data/budgets';
import { useRouter } from 'next/navigation'
import { useMyNavigationContext } from '@/contexts/NavigationContext';

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

  const valueFormatter = (value: number) => `$${value}`;
  const router = useRouter()
  const { setPage } = useMyNavigationContext();

  const [chartWidth, setChartWidth] = useState<number>();
  const [chartHeight, setChartHeight] = useState<number>();

  useEffect(() => {
    getWidth();
    getHeight();
  }, [])

  const getWidth = () => {
    const width = window.innerWidth;
    setChartWidth(width < 1920 ? 300 : 450);
  }

  const getHeight = () => {
    const width = window.innerWidth;
    setChartHeight(width < 1920 ? 300 : 400);
  }

  const clickHandler = () => {
    setPage('Budgets');
    router.push('/budgets');
  }

  return (
    <Card ml={5} className={styles.card}>
      <CardHeader className={styles.heading}>
        <Heading size="md">
          {monthNames[date.getMonth()]}'s Budget
        </Heading>
        <Button variant="outline" backgroundColor='#0088cc' color="white" size="sm" onClick={clickHandler}>
          View Details
        </Button>
      </CardHeader>
      <CardBody>
        <Flex flexDir="row" justifyContent="space-between">
          <Box flexGrow={1}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label}`,
                  data: budgetData
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
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
          </Box>
          <Box flexGrow={1}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Needs', 'Wants', 'Savings'] }]}
              series={[
                { data: [budgetData[0].value, budgetData[1].value, budgetData[2].value], label: "Spent", valueFormatter },
                { data: [budgetData[0].budget, budgetData[1].budget, budgetData[2].budget], label: "Budget", valueFormatter }
              ]}
              width={chartWidth}
              height={chartHeight}
            />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Budgets
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Flex, CardFooter, Heading } from '@chakra-ui/react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { budgetData } from '@/data/budgets';

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

  return (
    <Card ml={5} className={styles.card}>
      <CardHeader>
        <Heading size="md">
          {monthNames[date.getMonth()]}'s Budget
        </Heading>
      </CardHeader>
      <CardBody>
        <Heading size="small">50/30/20</Heading>
        <Flex flexDir="row">
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
          />
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Needs', 'Wants', 'Savings'] }]}
            series={[
              { data: [budgetData[0].value, budgetData[1].value, budgetData[2].value], label: "Spent", valueFormatter },
              { data: [budgetData[0].budget, budgetData[1].budget, budgetData[2].budget], label: "Budget", valueFormatter }
            ]}
            width={chartWidth}
            height={chartHeight}
          />
        </Flex>
      </CardBody>
    </Card>
  )
}

export default Budgets
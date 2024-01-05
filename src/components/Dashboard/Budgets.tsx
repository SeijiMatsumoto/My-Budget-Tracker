"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Flex, Heading, Box, Button } from '@chakra-ui/react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styles from '@/styles/Dashboard/dashboard.module.scss';
import { useRouter } from 'next/navigation'
import { useMyNavigationContext } from '@/contexts/NavigationContext';
import { useMyDataContext } from '@/contexts/DataContext';
import NoData from '../shared/NoData';

function Budgets() {
  const date = new Date();

  const valueFormatter = (value: number) => `$${value}`;
  const router = useRouter()
  const { setPage } = useMyNavigationContext();
  const { budgetData } = useMyDataContext();

  const [chartWidth, setChartWidth] = useState<number>();
  const [chartHeight, setChartHeight] = useState<number>();

  useEffect(() => {
    getWidth();
    getHeight();
  }, [])

  const getWidth = () => {
    const width = window.innerWidth;
    setChartWidth(width < 1920 ? 250 : 400);
  }

  const getHeight = () => {
    const width = window.innerWidth;
    setChartHeight(width < 1920 ? 250 : 350);
  }

  const clickHandler = () => {
    setPage('Settings');
    router.push('/settings');
  }

  const showBudgets = () => {
    if (!budgetData.length) return false;
    if (budgetData[0].value !== 0 || budgetData[1].value !== 0 || budgetData[2].value !== 0) return true;
  }

  return (
    <Card ml={5} className={styles.card}>
      <CardHeader className={styles.heading}>
        <Heading size="md">
          {date.toLocaleString('en-US', { month: 'long' })}'s Budget
        </Heading>
        <Button variant="outline" backgroundColor='#0088cc' color="white" size="sm" onClick={clickHandler}>
          Edit
        </Button>
      </CardHeader>
      <CardBody className={styles.cardBody}>
        {showBudgets() ? <Flex flexDir="row" justifyContent="space-evenly" className={styles.budgetsWrapper}>
          <Box>
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
          <Box>
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
        </Flex> : <NoData />}
      </CardBody>
    </Card>
  )
}

export default Budgets
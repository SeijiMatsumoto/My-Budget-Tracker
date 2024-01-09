"use client";
import { Flex } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CategoriesList from './CategoriesList'
import { useMyDataContext } from '@/contexts/DataContext';
import styles from '@/styles/Stats/stats.module.scss'

const PieChart = dynamic(() => import("./PieChart"))

interface Props {
  type: string;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  budget: string;
  tags: string[];
}

const ThreeStats = ({ type }: Props) => {
  const { dataToShow } = useMyDataContext();
  const [dataPoints, setDataPoints] = useState<Array<[string, any]>>([]);

  useEffect(() => {
    if (dataToShow.length) {
      setDataPoints(transformData(dataToShow, type));
    }
  }, [dataToShow])

  function transformData(originalData: Transaction[], type: string): Array<[string, any]> {
    const categorySums: Record<string, number> = {};

    originalData.forEach(item => {
      const category = item.category;
      let amount = item.amount;
      const itemType = item.type;
      if (type !== itemType) return;

      if (item.type !== "Income") {
        amount = amount * -1;
      }

      if (categorySums[category]) {
        categorySums[category] += amount;
      } else {
        categorySums[category] = amount;
      }
    });

    const result: Array<[string, any]> = [['Category', 'Total amount'], ...Object.entries(categorySums)];

    return result;
  }

  return (
    <Flex flexDir='column' className={styles.fullHeight} alignItems="center" justifyContent="center">
      {dataPoints.length ? <PieChart type={type} dataPoints={dataPoints} /> : null}
      <CategoriesList type={type} dataPoints={dataPoints} />
    </Flex>
  )
}

export default ThreeStats
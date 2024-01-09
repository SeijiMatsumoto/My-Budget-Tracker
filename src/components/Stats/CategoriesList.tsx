"use client"
import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import styles from '@/styles/Stats/stats.module.scss'
type Props = {
  type: string;
  dataPoints: DataPoint[];
}

interface DataPoint {
  y: number;
  label: string;
  percentage: number;
}

const CategoriesList = ({ dataPoints }: Props) => {
  dataPoints.sort((a: DataPoint, b: DataPoint) => b.y - a.y);

  return (
    <Flex width="100%" height="50%" justifyContent="center">
      <Flex width="60%" flexDir="column" borderTop='1px solid rgba(0, 0, 0, 0.065)'>
        {dataPoints.map((point: DataPoint) => (
          <Flex justifyContent="space-between" alignItems="center" className={styles.itemWrapper}>
            <Flex>
              <Text width='50px' mr={3} className={styles.percentage}>{point.percentage}%</Text>
              <Text className={styles.label}>{point.label}</Text>
            </Flex>
            <Text className={styles.sum}>$ {point.y.toFixed(2)}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoriesList
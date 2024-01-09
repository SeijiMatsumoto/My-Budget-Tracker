"use client"
import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import styles from '@/styles/Stats/stats.module.scss'
type Props = {
  type: string;
  dataPoints: Array<[string, any]>;
}

const CategoriesList = ({ dataPoints }: Props) => {
  dataPoints.sort((a: [string, any], b: [string, any]) => b[1] - a[1]);

  return (
    <Flex width="100%" height="50%" justifyContent="center">
      <Flex width="60%" flexDir="column" borderTop='1px solid rgba(0, 0, 0, 0.065)'>
        {dataPoints.slice(1).map((point: [string, number]) => (
          <Flex justifyContent="space-between" alignItems="center" className={styles.itemWrapper}>
            <Flex>
              {/* <Text width='50px' mr={3} className={styles.percentage}>{point[0]}%</Text> */}
              <Text className={styles.label}>{point[0]}</Text>
            </Flex>
            <Text className={styles.sum}>$ {point[1].toFixed(2)}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default CategoriesList
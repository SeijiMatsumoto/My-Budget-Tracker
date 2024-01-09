"use client"
import React, { useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import { Flex } from '@chakra-ui/react';
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


const PieChart = ({ type, dataPoints }: Props) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: `${type} Breakdown`
    },
    data: [{
      type: "pie",
      startAngle: 90,
      toolTipContent: '<b>{label}</b>: {percentage}%',
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {percentage}%",
      dataPoints: dataPoints
    }],
  }

  return (
    <Flex width="100%" height="50%" mb={10} justifyContent="center" alignItems="center">
      <CanvasJSChart options={options} className={styles.chart} />
    </Flex>
  )
}

export default PieChart
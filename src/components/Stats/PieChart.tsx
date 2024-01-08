"use client"
import React, { useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import { Flex } from '@chakra-ui/react';

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
    }]
  }

  return (
    <Flex width="100%" mb={5} justifyContent="center">
      <CanvasJSChart options={options} />
    </Flex>
  )
}

export default PieChart
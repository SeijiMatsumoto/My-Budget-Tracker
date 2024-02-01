"use client"
import React from 'react'
import { Flex } from '@chakra-ui/react';
import { Chart } from "react-google-charts";

type Props = {
  type: string;
  dataPoints: Array<[string, any]>;
}

const PieChart = ({ type, dataPoints }: Props) => {
  const options = {
    title: type,
  };

  return (
    <Flex width="100%" height="50%" mb={10} justifyContent="center" alignItems="center">
      <Chart
        chartType="PieChart"
        data={dataPoints}
        options={options}
        width={"600px"}
        height={"100%"}
      />
    </Flex>
  )
}

export default PieChart
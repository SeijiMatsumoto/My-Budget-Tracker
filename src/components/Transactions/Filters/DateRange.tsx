"use client"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Heading
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DatePicker, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '@/styles/Transactions/transactions.module.scss'
import { useMyDataContext } from '@/contexts/DataContext';
import { FaChevronDown } from "react-icons/fa";

interface Props {
  isDrawer: boolean;
}

const DateRange = ({ isDrawer }: Props) => {
  const currentDate = new Date();
  const { startDate, endDate, setStartDate, setEndDate, rangeType, setRangeType } = useMyDataContext();

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (rangeType === "Year") {
      const firstDayOfYear = new Date(year, 0, 1);
      const lastDayOfYear = new Date(year, 11, 31);
      setStartDate(firstDayOfYear);
      setEndDate(lastDayOfYear);
    } else if (rangeType === "Month") {
      const firstOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      setStartDate(firstOfMonth);
      setEndDate(endOfMonth)
    } else if (rangeType === "Week") {
      const currentDayOfWeek = currentDate.getDay();
      const daysUntilFirstDay = currentDayOfWeek === 0 ? 0 : 1 - currentDayOfWeek;
      const firstDayOfWeek = new Date(year, month, day + daysUntilFirstDay);
      const daysUntilLastDay = 6 - currentDayOfWeek;
      const lastDayOfWeek = new Date(year, month, day + daysUntilLastDay);
      setStartDate(firstDayOfWeek);
      setEndDate(lastDayOfWeek)
    }
  }, [rangeType])

  return (
    <Flex mb={isDrawer ? 5 : 0} flexDir={isDrawer ? "column" : "row"}>
      {isDrawer && <Heading size="md" mb={1}>Date Range</Heading>}
      <Menu matchWidth>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} width="100%">
          {rangeType}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setRangeType("Month")}>Month</MenuItem>
          <MenuItem onClick={() => setRangeType('Year')}>Year</MenuItem>
          <MenuItem onClick={() => setRangeType('Week')}>Week</MenuItem>
          <MenuItem onClick={() => setRangeType('Custom')}>Custom</MenuItem>
        </MenuList>
      </Menu>
      <InputGroup style={{ width: isDrawer ? '100%' : '300px', height: '40px', marginLeft: isDrawer ? '0' : '8px' }}>
        <DatePicker
          format="MM-dd-yyyy"
          block
          appearance="subtle"
          style={{ width: '50%' }}
          value={startDate}
          onChangeCalendarDate={(date: Date) => { setRangeType("Custom"); setStartDate(date) }}
          className={styles.datePicker}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <DatePicker
          format="MM-dd-yyyy"
          block
          appearance="subtle"
          style={{ width: '50%' }}
          value={endDate}
          onChangeCalendarDate={(date: Date) => { setRangeType("Custom"); setEndDate(date) }}
          className={styles.datePicker}
        />
      </InputGroup>
    </Flex>
  )
}

export default DateRange
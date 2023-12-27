"use client"
import { Flex, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DatePicker, InputGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from '@/styles/Transactions/transactions.module.scss'

type Props = {
  startDate: Date;
  endDate: Date;
  setStartDate: Function;
  setEndDate: Function;
}

const DateRange = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
  const currentDate = new Date();

  const [radioValue, setValue] = useState<string>('month')

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    if (radioValue === "year") {
      const firstDayOfYear = new Date(year, 0, 1);
      const lastDayOfYear = new Date(year, 11, 31);
      setStartDate(firstDayOfYear);
      setEndDate(lastDayOfYear);
    } else if (radioValue === "month") {
      const firstOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
      setStartDate(firstOfMonth);
      setEndDate(endOfMonth)
    } else if (radioValue === "week") {
      const currentDayOfWeek = currentDate.getDay();
      const daysUntilFirstDay = currentDayOfWeek === 0 ? 0 : 1 - currentDayOfWeek;
      const firstDayOfWeek = new Date(year, month, day + daysUntilFirstDay);
      const daysUntilLastDay = 6 - currentDayOfWeek;
      const lastDayOfWeek = new Date(year, month, day + daysUntilLastDay);
      setStartDate(firstDayOfWeek);
      setEndDate(lastDayOfWeek)
    }
  }, [radioValue])

  return (
    <Flex flexDir="column">
      <RadioGroup onChange={setValue} value={radioValue} mb={3}>
        <Stack dir="column">
          <Radio value="year">This Year</Radio>
          <Radio value="month">This Month</Radio>
          <Radio value="week">This Week</Radio>
          <Radio value="custom">Custom Range</Radio>
        </Stack>
      </RadioGroup>
      <InputGroup style={{ width: '100%' }}>
        <DatePicker
          format="MM-dd-yyyy"
          block
          appearance="default"
          style={{ width: '50%' }}
          value={startDate}
          onChangeCalendarDate={(date: Date) => setStartDate(date)}
          className={styles.datePicker}
          onClean={() => setValue('month')}
          disabled={radioValue !== "custom"}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <DatePicker
          format="MM-dd-yyyy"
          block
          appearance="default"
          style={{ width: '50%' }}
          value={endDate}
          onChangeCalendarDate={(date: Date) => setEndDate(date)}
          className={styles.datePicker}
          onClean={() => setValue('month')}
          disabled={radioValue !== "custom"}
        />
      </InputGroup>
    </Flex>
  )
}

export default DateRange
import {
  Card,
  CardBody,
} from '@chakra-ui/react'
import React from 'react'
import SplitBudget from './SplitBudget'
import styles from '@/styles/Settings/settings.module.scss'
import Categories from '../CategoriesSettings/Categories'
import Recurring from '../RecurringSettings/Recurring'

const BudgetSettings = () => {

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <CardBody overflow-y="scroll">
          <SplitBudget />
          <Categories />
          <Recurring />
        </CardBody>
      </Card>
    </div>
  )
}

export default BudgetSettings
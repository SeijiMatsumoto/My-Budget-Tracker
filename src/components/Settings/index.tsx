import {
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import SplitBudget from './BudgetSettings/SplitBudget'
import styles from '@/styles/Settings/settings.module.scss'
import Categories from './CategoriesSettings/Categories'
import Recurring from './RecurringSettings/Recurring'

function Settings() {
  return (
    <div className={styles.wrapper}>
      <Flex flexDir="column" className={styles.card}>
        <SplitBudget />
        <Categories />
        <Recurring />
      </Flex>
    </div>)
}

export default Settings
'use client'
import React from 'react'
import {
  Card, CardBody, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'
import ThreeStats from './ThreeStats';
import styles from '@/styles/Stats/stats.module.scss'

const DataOverview = () => {
  const tabs = ['Transactions', 'Savings', 'Income', 'Budget'];

  const renderTab = (tab: String) => {
    switch (tab) {
      case 'Transactions':
        return <ThreeStats type='Transaction' />
      case 'Savings':
        return <ThreeStats type='Savings' />
      case 'Income':
        return <ThreeStats type='Income' />
      case 'Budget':
        return null;
      default:
        return null;
    }
  }

  return (
    <Card width="100%" className={styles.fullHeight}>
      <Tabs isFitted variant="enclosed" className={styles.fullHeight}>
        <TabList>
          {tabs.map((tab: string) => <Tab key={tab + 'tabPanelTab'}>{tab}</Tab>)}
        </TabList>
        <TabPanels className={styles.fullHeight}>
          {tabs.map(tab => (
            <TabPanel key={tab + 'tabPanelStat'} pt={0} className={styles.fullHeight}>
              <CardBody className={styles.cardBody}>
                {renderTab(tab)}
              </CardBody>
            </TabPanel>))}
        </TabPanels>
      </Tabs>
    </Card >
  )
}

export default DataOverview
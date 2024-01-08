'use client'
import React from 'react'
import {
  Card, CardBody, Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'
import ThreeStats from './ThreeStats';

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
    <Card width="100%" height="100%">
      <Tabs isFitted variant="enclosed">
        <TabList>
          {tabs.map((tab: string) => <Tab key={tab + 'tabPanelTab'}>{tab}</Tab>)}
        </TabList>
        <TabPanels>
          {tabs.map(tab => (
            <TabPanel key={tab + 'tabPanelStat'} pt={0}>
              <CardBody overflow="scroll">
                {renderTab(tab)}
              </CardBody>
            </TabPanel>))}
        </TabPanels>
      </Tabs>
    </Card >
  )
}

export default DataOverview
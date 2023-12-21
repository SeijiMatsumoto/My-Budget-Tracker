import React from 'react'
import { MdAttachMoney, MdBarChart, MdCalculate, MdDashboard, MdMoney, MdSettings } from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon } from '@chakra-ui/react';
import styles from '../../styles/Navigation/links.module.scss'

function Links() {
  const links = [
    {
      title: "MAIN",
      children: [
        {
          title: "Dashboard",
          href: "/",
          icon: MdDashboard
        }, {
          title: "Transactions",
          href: "/transactions",
          icon: MdAttachMoney
        }, {
          title: "Budgets",
          href: "/budgets",
          icon: FaPiggyBank
        }, {
          title: "Charts",
          href: "/charts",
          icon: MdBarChart
        }
      ]
    },
    {
      title: "TOOLS",
      children: [
        {
          title: "Calculators",
          href: "/calculators",
          icon: MdCalculate
        }
      ]
    },
    {
      title: "SETTINGS",
      children: [
        {
          title: "Settings",
          href: "/settings",
          icon: MdSettings
        }
      ]
    }
  ]

  return (
    <Flex mt="50px" flexDir={"column"} fontSize={16} >
      {links.map((link, i) => {
        return (
          <Flex key={link.title + i} flexDir={"column"} className={styles.category}>
            <h4 className={styles.heading}>{link.title}</h4>
            {link.children.map((child, j) => {
              return (
                <Link key={child.title + i} className={styles.link} href={child.href}>
                  <Icon as={child.icon} className={styles.icon} />
                  {child.title}
                </Link>
              )
            })}
            {i !== links.length - 1 ? <hr className={styles.line} /> : null}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Links
import {
  MdAttachMoney,
  MdBarChart,
  MdCalculate,
  MdDashboard,
  MdMoney,
  MdSettings,
} from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

export const links = [
  {
    title: "MAIN",
    children: [
      {
        title: "Dashboard",
        href: "/",
        icon: MdDashboard,
      },
      {
        title: "Transactions",
        href: "/transactions",
        icon: MdAttachMoney,
      },
      {
        title: "Stats",
        href: "/stats",
        icon: IoStatsChart,
      },
    ],
  },
  {
    title: "TOOLS",
    children: [
      {
        title: "Calculators",
        href: "/calculators",
        icon: MdCalculate,
      },
    ],
  },
  {
    title: "SETTINGS",
    children: [
      {
        title: "Settings",
        href: "/settings",
        icon: MdSettings,
      },
    ],
  },
];

export const mobileLinks = [
  {
    title: "Calculators",
    href: "/calculators",
    icon: MdCalculate,
  },
  {
    title: "Stats",
    href: "/stats",
    icon: IoStatsChart,
  },
  {
    title: "Dashboard",
    href: "/",
    icon: MdDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: MdAttachMoney,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: MdSettings,
  },
];

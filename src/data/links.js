import {
  MdAttachMoney,
  MdBarChart,
  MdCalculate,
  MdDashboard,
  MdMoney,
  MdSettings,
} from "react-icons/md";
import { FaPiggyBank } from "react-icons/fa";

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

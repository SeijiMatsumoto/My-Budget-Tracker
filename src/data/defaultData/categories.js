export const transactionCategories = [
  "Groceries",
  "Rent",
  "Utilities",
  "Transportation",
  "Dining Out",
  "Entertainment",
  "Healthcare",
  "Insurance",
  "Education",
  "Shopping",
  "Savings",
  "Investments",
  "Gifts",
  "Miscellaneous",
  "Clothing",
  "Electronics",
  "Home Improvement",
  "Travel",
  "Subscriptions",
  "Pet",
  "Hobbies",
  "Charity",
];

export const incomeCategories = ["Salary", "Allowance", "Gift", "Other"];

export const savingsCategories = ["401k", "Ally Bank", "Roth IRA"];

export const defaultCategoriesData = [
  {
    type: "transaction",
    data: transactionCategories,
  },
  {
    type: "income",
    data: incomeCategories,
  },
  {
    type: "savings",
    data: savingsCategories,
  },
];

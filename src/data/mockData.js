// Summary Cards Data
export const summaryData = {
  totalBalance: {
    label: "Total Balance",
    value: 124500,
    trend: 8.2,
    isPositive: true
  },
  totalIncome: {
    label: "Total Income",
    value: 45000,
    trend: 12.5,
    isPositive: true
  },
  totalExpenses: {
    label: "Total Expenses",
    value: 28400,
    trend: 3.1,
    isPositive: false // Meaning expenses went up, which is negative for the user usually, or positive. We'll show downward/upward based on this.
  }
};

// Line Chart Data - Balance Trend (Last 6 Months)
export const balanceTrendData = [
  { month: "Oct", balance: 95000 },
  { month: "Nov", balance: 102000 },
  { month: "Dec", balance: 98000 },
  { month: "Jan", balance: 110000 },
  { month: "Feb", balance: 115000 },
  { month: "Mar", balance: 124500 },
];

// Donut Chart Data - Spending by Category
export const categorySpendingData = [
  { name: "Food", value: 8500, color: "#3b82f6" }, // Blue
  { name: "Transport", value: 3200, color: "#8b5cf6" }, // Purple
  { name: "Shopping", value: 5400, color: "#ec4899" }, // Pink
  { name: "Bills", value: 7200, color: "#10b981" }, // Green
  { name: "Health", value: 2100, color: "#f59e0b" }, // Yellow
  { name: "Entertainment", value: 2000, color: "#ef4444" }, // Red
];

// Transactions List
export const transactionsData = [
  {
    id: "tx-1",
    date: "2024-03-28T10:30:00Z",
    description: "Salary Deposit - Tech Corp",
    category: "Income",
    amount: 45000,
    type: "Income"
  },
  {
    id: "tx-2",
    date: "2024-03-27T18:45:00Z",
    description: "Amazon Web Services",
    category: "Bills",
    amount: 1250,
    type: "Expense"
  },
  {
    id: "tx-3",
    date: "2024-03-26T13:15:00Z",
    description: "Whole Foods Market",
    category: "Food",
    amount: 3200,
    type: "Expense"
  },
  {
    id: "tx-4",
    date: "2024-03-25T09:20:00Z",
    description: "Uber Ride",
    category: "Transport",
    amount: 450,
    type: "Expense"
  },
  {
    id: "tx-5",
    date: "2024-03-24T20:00:00Z",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: 899,
    type: "Expense"
  },
  {
    id: "tx-6",
    date: "2024-03-23T11:10:00Z",
    description: "Freelance Project Payment",
    category: "Income",
    amount: 15500,
    type: "Income"
  },
  {
    id: "tx-7",
    date: "2024-03-20T14:30:00Z",
    description: "Pharmacy",
    category: "Health",
    amount: 1200,
    type: "Expense"
  },
  {
    id: "tx-8",
    date: "2024-03-18T16:45:00Z",
    description: "Apple Store",
    category: "Shopping",
    amount: 8500,
    type: "Expense"
  }
];

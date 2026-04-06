# FinanceIQ Dashboard

A modern, responsive personal finance dashboard built with React. Track transactions, visualize spending patterns, and gain automated insights — all from a clean, role-aware interface with full dark mode support.

> **Live Demo:** [Coming Soon](#) <!-- Replace with deployed URL -->

---

## Features

- **Dashboard Overview** — Summary cards for balance, income, and expenses with trend indicators
- **Interactive Charts** — Area chart for balance trends and donut chart for category-wise spending (Recharts)
- **Transaction Ledger** — Filterable, sortable table with search, type filters, and inline CRUD operations
- **Automated Insights** — Computed analytics: savings rate, highest spending category, largest transaction, monthly comparisons
- **Role-Based UI** — Toggle between Viewer and Admin roles; Admin unlocks add/edit/delete controls
- **Dark Mode** — Full light/dark theme toggle with smooth transitions, persisted to localStorage
- **Data Persistence** — Transactions and preferences survive page refreshes via localStorage
- **Data Export** — Export filtered transactions as CSV or JSON with one click
- **Skeleton Loading** — Animated loading states simulating async data fetches
- **Micro-Animations** — Page transitions, card entrance staging, and modal animations via Framer Motion
- **Fully Responsive** — Mobile drawer sidebar, stacked grids, scrollable tables across all breakpoints

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | React 19 (Vite)                     |
| Styling          | Tailwind CSS 4                      |
| Charts           | Recharts                            |
| Routing          | React Router v7                     |
| State Management | React Context API + `useReducer`    |
| Animations       | Framer Motion                       |
| Icons            | Lucide React                        |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/financeiq-dashboard.git
cd financeiq-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## Folder Structure

```
src/
├── components/
│   ├── common/
│   │   └── Skeleton.jsx          # Reusable skeleton loader
│   ├── dashboard/
│   │   ├── BalanceChart.jsx       # Area chart — balance over time
│   │   ├── ExpenseChart.jsx       # Donut chart — spending by category
│   │   └── SummaryCard.jsx        # Metric card with trend indicator
│   ├── layout/
│   │   ├── Layout.jsx             # App shell — sidebar + navbar + outlet
│   │   ├── Navbar.jsx             # Top bar — search, role switcher, theme toggle
│   │   └── Sidebar.jsx            # Navigation — desktop sticky, mobile drawer
│   └── transactions/
│       └── TransactionModal.jsx   # Add/Edit form with validation
├── context/
│   └── AppContext.jsx             # Centralized state — reducer, provider, hooks
├── data/
│   └── mockData.js                # Seed data for transactions and charts
├── pages/
│   ├── Dashboard.jsx              # Overview page — cards + charts
│   ├── Insights.jsx               # Computed analytics dashboard
│   └── Transactions.jsx           # Ledger — table, filters, exports
├── utils/                         # Utility functions (reserved)
├── App.jsx                        # Route definitions
├── main.jsx                       # Entry point — providers + router
└── index.css                      # Tailwind directives + base styles
```

---

## Role-Based UI

The app supports two frontend-only roles, toggled via the navbar dropdown:

| Capability            | Viewer | Admin |
| --------------------- | :----: | :---: |
| View dashboard        |   ✅   |  ✅   |
| View transactions     |   ✅   |  ✅   |
| View insights         |   ✅   |  ✅   |
| Export data            |   ✅   |  ✅   |
| Add transaction        |   ❌   |  ✅   |
| Edit transaction       |   ❌   |  ✅   |
| Delete transaction     |   ❌   |  ✅   |
| Admin badge in navbar  |   ❌   |  ✅   |

No backend authentication is involved — role state is managed entirely in the client.

---

## State Management

All application state lives in a single `useReducer` store, exposed through split contexts for performance:

```
AppProvider
├── AppStateContext   → useAppState()     (read state)
└── AppDispatchContext → useAppDispatch()  (dispatch actions)
```

### Actions

| Action               | Payload                | Effect                              |
| -------------------- | ---------------------- | ----------------------------------- |
| `ADD_TRANSACTION`    | Transaction object     | Prepends to transaction list        |
| `EDIT_TRANSACTION`   | Updated transaction    | Replaces matching entry by ID       |
| `DELETE_TRANSACTION` | Transaction ID         | Removes entry by ID                 |
| `SET_FILTER`         | Partial filter object  | Merges into active filters          |
| `SET_ROLE`           | `'Viewer'` or `'Admin'`| Updates active role                 |
| `TOGGLE_DARK_MODE`   | —                      | Flips theme boolean                 |
| `SET_LOADING`        | Boolean                | Controls skeleton visibility        |

State changes to `transactions` and `darkMode` are automatically synced to `localStorage`.

---

## Screenshots

<!-- Add screenshots of your dashboard here -->

| Dashboard (Dark) | Dashboard (Light) |
| :-: | :-: |
| ![Dashboard Dark](#) | ![Dashboard Light](#) |

| Transactions | Insights |
| :-: | :-: |
| ![Transactions](#) | ![Insights](#) |

---

## Future Improvements

- [ ] Backend API integration with real authentication
- [ ] Date range filtering and custom report generation
- [ ] Budget goals and spending alerts
- [ ] Recurring transaction support
- [ ] Unit and integration tests (Vitest + React Testing Library)
- [ ] PWA support for offline access
- [ ] Multi-currency support

---

## License

This project is licensed under the [MIT License](LICENSE).

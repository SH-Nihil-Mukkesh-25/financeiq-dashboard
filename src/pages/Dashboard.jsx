import React from 'react';
import { DollarSign, Wallet, TrendingDown } from 'lucide-react';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { summaryData } from '../data/mockData';
import { useAppState } from '../context/AppContext';
import { Skeleton } from '../components/common/Skeleton';

const Dashboard = () => {
  const { isLoading } = useAppState();

  const handleDownloadReport = () => {
    const reportText = `FinanceIQ Executive Summary\nDate: ${new Date().toLocaleDateString()}\n\nTotal Balance: ${summaryData.totalBalance.value}\nTotal Income: ${summaryData.totalIncome.value}\nTotal Expenses: ${summaryData.totalExpenses.value}\n\n* Generated dynamically by FinanceIQ Dashboard *`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financeiq_summary_report.txt';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, here's your overview for today.</p>
        </div>
        <button onClick={handleDownloadReport} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-transform w-full sm:w-auto shadow-lg shadow-blue-500/20 active:scale-95">
          Download Report
        </button>
      </div>

      {isLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
             <Skeleton className="h-[156px]" />
             <Skeleton className="h-[156px]" />
             <Skeleton className="h-[156px]" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-0">
             <Skeleton className="h-[400px] lg:col-span-2" />
             <Skeleton className="h-[400px]" />
          </div>
        </>
      ) : (
        <>
          {/* Summary Cards Grid (Phase 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
            <SummaryCard 
              title={summaryData.totalBalance.label}
              value={`₹${summaryData.totalBalance.value.toLocaleString('en-IN')}`}
              trend={summaryData.totalBalance.trend}
              isPositive={summaryData.totalBalance.isPositive}
              icon={Wallet}
              colorTheme="blue"
              index={0}
            />
            <SummaryCard 
              title={summaryData.totalIncome.label}
              value={`₹${summaryData.totalIncome.value.toLocaleString('en-IN')}`}
              trend={summaryData.totalIncome.trend}
              isPositive={summaryData.totalIncome.isPositive}
              icon={DollarSign}
              colorTheme="green"
              index={1}
            />
            <SummaryCard 
              title={summaryData.totalExpenses.label}
              value={`₹${summaryData.totalExpenses.value.toLocaleString('en-IN')}`}
              trend={summaryData.totalExpenses.trend}
              isPositive={summaryData.totalExpenses.isPositive}
              icon={TrendingDown}
              colorTheme="red"
              index={2}
            />
          </div>

          {/* Charts Grid (Phase 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-0">
            <div className="lg:col-span-2">
              <BalanceChart />
            </div>
            <div>
              <ExpenseChart />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

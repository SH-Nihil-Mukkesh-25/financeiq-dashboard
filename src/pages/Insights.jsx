import React, { useMemo } from 'react';
import { Target, TrendingUp, TrendingDown, PieChart, CreditCard, Activity } from 'lucide-react';
import { useAppState } from '../context/AppContext';
import { Skeleton } from '../components/common/Skeleton';
import { motion } from 'framer-motion';

export const Insights = () => {
  const { transactions, isLoading } = useAppState();

  const analytics = useMemo(() => {
    // 1. Separation
    const expenses = transactions.filter(t => t.type === 'Expense');
    const income = transactions.filter(t => t.type === 'Income');
    
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    
    // 2. Highest Spending Category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    let highestCat = { name: 'N/A', amount: 0, percent: 0 };
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestCat.amount) {
        highestCat = { name: cat, amount: amt, percent: ((amt / totalExpense) * 100).toFixed(1) };
      }
    }

    // 3. Monthly Comparison
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthTx = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
    
    const lastMonthTx = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    const thisMonthIncome = thisMonthTx.filter(t => t.type === 'Income').reduce((s,t) => s + t.amount, 0);
    const thisMonthExpense = thisMonthTx.filter(t => t.type === 'Expense').reduce((s,t) => s + t.amount, 0);
    
    const lastMonthIncome = lastMonthTx.filter(t => t.type === 'Income').reduce((s,t) => s + t.amount, 0);
    const lastMonthExpense = lastMonthTx.filter(t => t.type === 'Expense').reduce((s,t) => s + t.amount, 0);

    // 4. Savings Rate
    const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

    // 5. Biggest Single Transaction
    const biggestTx = expenses.length > 0 ? expenses.reduce((max, t) => t.amount > max.amount ? t : max, expenses[0]) : null;

    return {
      totalExpense,
      totalIncome,
      highestCat,
      savingsRate,
      biggestTx,
      monthly: {
        thisMonthIncome,
        thisMonthExpense,
        lastMonthIncome,
        lastMonthExpense
      }
    };
  }, [transactions]);

  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

  const incomePercent = analytics.totalIncome > 0 
    ? (analytics.totalIncome / (analytics.totalIncome + analytics.totalExpense)) * 100 
    : 0;
  const expensePercent = analytics.totalExpense > 0 
    ? (analytics.totalExpense / (analytics.totalIncome + analytics.totalExpense)) * 100 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Automated Insights</h1>
            <p className="text-gray-500 dark:text-gray-400">Deep analysis algorithms reading from your live dataset.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Skeleton className="h-[200px]" />
           <Skeleton className="h-[200px]" />
           <Skeleton className="h-[240px] lg:col-span-2" />
           <Skeleton className="h-[200px]" />
           <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Automated Insights</h1>
          <p className="text-gray-500 dark:text-gray-400">Deep analysis algorithms reading from your live dataset.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Highest Category */}
        <motion.div initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-[#404040] transition-all hover:shadow-md dark:shadow-none group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg border border-purple-200 dark:border-purple-500/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
               <PieChart className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Highest Category</h2>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{analytics.highestCat.name}</p>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded inline-block">{analytics.highestCat.percent}% of all expenses</p>
            </div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{formatCurrency(analytics.highestCat.amount)}</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">You spend the most capital sourcing inside this individual sector.</p>
        </motion.div>

        {/* Savings Rate */}
        <motion.div initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-[#404040] transition-all hover:shadow-md dark:shadow-none group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-500/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
               <Target className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Net Savings Rate</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{analytics.savingsRate}%</p>
            <div className="h-10 w-px bg-gray-200 dark:bg-[#262626]"></div>
            <div>
               <p className="text-sm text-gray-400">Retained</p>
               <p className="font-semibold text-green-600 dark:text-green-500">{formatCurrency(analytics.totalIncome - analytics.totalExpense)}</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">A powerful indicator of financial health dictating retained capital per cycle.</p>
        </motion.div>

        {/* Income vs Expenses Progress */}
        <motion.div initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-[#404040] transition-all hover:shadow-md dark:shadow-none lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
               <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Income vs Expense Yields</h2>
          </div>
          
          <div className="space-y-6">
            <div className="w-full h-8 flex rounded-xl overflow-hidden bg-gray-100 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626]">
               <div style={{ width: `${incomePercent}%` }} className="bg-green-500/90 hover:bg-green-500 transition-colors h-full"></div>
               <div style={{ width: `${expensePercent}%` }} className="bg-red-500/90 hover:bg-red-500 transition-colors h-full"></div>
            </div>
            
            <div className="flex justify-between items-center sm:px-4">
              <div className="space-y-1">
                 <p className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-500 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Gross Income
                 </p>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(analytics.totalIncome)}</p>
              </div>
              <div className="space-y-1 text-right">
                 <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500 flex items-center gap-2 justify-end">
                    <TrendingDown className="w-3.5 h-3.5" /> Gross Expenses
                 </p>
                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(analytics.totalExpense)}</p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-6 border-t border-gray-200 dark:border-[#262626] pt-4">Direct distribution mapping of all incoming capital versus outgoing liquidations.</p>
        </motion.div>

        {/* Biggest Transaction */}
        <motion.div initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}} className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-[#404040] transition-all hover:shadow-md dark:shadow-none group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg border border-orange-200 dark:border-orange-500/20 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 transition-colors">
               <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Largest Ticket Size</h2>
          </div>
          {analytics.biggestTx ? (
            <>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">-{formatCurrency(analytics.biggestTx.amount)}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{analytics.biggestTx.description}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(analytics.biggestTx.date).toLocaleDateString('en-IN')}</p>
            </>
          ) : (
            <p className="text-gray-500">No transactions recorded.</p>
          )}
          <p className="text-gray-500 text-sm mt-4">The absolute largest single liquidation recorded in your ledger.</p>
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 shadow-sm hover:border-gray-300 dark:hover:border-[#404040] transition-all hover:shadow-md dark:shadow-none group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-lg border border-pink-200 dark:border-pink-500/20 group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20 transition-colors">
               <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Comparison</h2>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626]">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Month</span>
                <span className="font-semibold flex gap-3">
                   <span className="text-green-600 dark:text-green-500">+{formatCurrency(analytics.monthly.thisMonthIncome)}</span>
                   <span className="text-red-600 dark:text-red-500">-{formatCurrency(analytics.monthly.thisMonthExpense)}</span>
                </span>
             </div>
             <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626]">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Month</span>
                <span className="font-semibold text-gray-500 flex gap-3 opacity-70">
                   <span>+{formatCurrency(analytics.monthly.lastMonthIncome)}</span>
                   <span>-{formatCurrency(analytics.monthly.lastMonthExpense)}</span>
                </span>
             </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">Comparative timeline tracking your net metrics exactly 30 days trailing.</p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Insights;

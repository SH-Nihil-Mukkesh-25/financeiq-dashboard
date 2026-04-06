import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { categorySpendingData } from '../../data/mockData';
import { motion } from 'framer-motion';
import { useAppState } from '../../context/AppContext';

export const ExpenseChart = () => {
  const { darkMode } = useAppState();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 h-full flex flex-col shadow-sm transition-colors"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Spending by Category</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categorySpendingData}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
            >
              {categorySpendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#171717' : '#ffffff', 
                borderColor: darkMode ? '#262626' : '#e5e7eb', 
                borderRadius: '8px', 
                color: darkMode ? '#f5f5f5' : '#111827',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: darkMode ? '#fff' : '#111827', fontWeight: 600 }}
              formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', color: darkMode ? '#a3a3a3' : '#6b7280' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

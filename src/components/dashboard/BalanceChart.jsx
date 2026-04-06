import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { balanceTrendData } from '../../data/mockData';
import { motion } from 'framer-motion';
import { useAppState } from '../../context/AppContext';

export const BalanceChart = () => {
  const { darkMode } = useAppState();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 h-full flex flex-col shadow-sm transition-colors"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Balance Trend</h2>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#262626" : "#e5e7eb"} vertical={false} />
            <XAxis dataKey="month" stroke={darkMode ? "#737373" : "#6b7280"} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={darkMode ? "#737373" : "#6b7280"} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#171717' : '#ffffff', 
                borderColor: darkMode ? '#262626' : '#e5e7eb', 
                borderRadius: '8px', 
                color: darkMode ? '#f5f5f5' : '#111827',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
            />
            <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

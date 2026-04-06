import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const SummaryCard = ({ title, value, trend, isPositive, icon: Icon, colorTheme, index }) => {
  const colorMap = {
    blue: 'text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    green: 'text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
    red: 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
  };

  const bgStyle = colorMap[colorTheme] || colorMap.blue;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl p-6 transition-all hover:border-gray-300 dark:hover:border-[#404040] shadow-sm hover:shadow-md dark:shadow-none flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl border ${bgStyle} transition-transform hover:scale-110`}>
          <Icon className="w-6 h-6 flex-shrink-0" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-md transition-colors ${
          isPositive 
            ? 'text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-400/10' 
            : 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-400/10'
        }`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}%
        </div>
      </div>
      <div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
};

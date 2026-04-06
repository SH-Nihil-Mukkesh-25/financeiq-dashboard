import React from 'react';

export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-[#262626] rounded-xl ${className}`}></div>
  );
};

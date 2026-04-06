import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, LineChart, LogOut, Settings, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Transactions', icon: Receipt, path: '/transactions' },
    { label: 'Insights', icon: LineChart, path: '/insights' },
  ];

  const bottomItems = [
    { label: 'Settings', icon: Settings, action: () => alert('Settings panel is currently under construction for a future update!') },
    { label: 'Logout', icon: LogOut, action: () => alert('You have been securely logged out.') },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-40
        w-64 bg-gray-50 dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-[#262626]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 md:hidden">
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-6 px-4 space-y-1 md:mt-16">
          <p className="px-3 text-xs font-bold tracking-wider text-gray-500 uppercase mb-4">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#171717] hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-[#262626] space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 font-medium transition-all group
                hover:bg-gray-200 dark:hover:bg-[#171717] hover:text-gray-900 dark:hover:text-white
                ${item.label === 'Logout' ? 'hover:text-red-500 dark:hover:text-red-400' : ''}
              `}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${item.label === 'Logout' ? 'group-hover:text-red-500 dark:group-hover:text-red-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

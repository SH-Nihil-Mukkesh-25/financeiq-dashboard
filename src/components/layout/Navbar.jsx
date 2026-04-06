import React from 'react';
import { Bell, Search, User, Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { useAppState, useAppDispatch, ActionTypes } from '../../context/AppContext';

const Navbar = ({ onMenuToggle }) => {
  const { role, darkMode } = useAppState();
  const dispatch = useAppDispatch();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = React.useState(false);

  return (
    <nav className="h-16 bg-white dark:bg-[#171717] border-b border-gray-200 dark:border-[#262626] flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white shadow-sm shadow-blue-500/20 transition-transform hover:scale-105">
            F
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">FinanceIQ</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-100 dark:bg-[#262626] text-sm text-gray-900 dark:text-gray-200 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-48 lg:w-64 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-500"
          />
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] rounded-full transition-colors"
            onClick={() => dispatch({ type: ActionTypes.TOGGLE_DARK_MODE })}
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
          
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] rounded-full transition-colors relative hidden sm:block">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 border-2 border-white dark:border-[#171717] rounded-full"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-gray-200 dark:border-[#262626] relative">
          <button 
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden shrink-0">
              <User className="w-5 h-5 text-white/90" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Admin User</span>
                {role === 'Admin' && (
                  <span className="text-[10px] font-bold tracking-wider text-blue-900 bg-blue-100 dark:bg-blue-400 px-1.5 py-0.5 rounded uppercase">Admin</span>
                )}
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{role} View</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl shadow-xl overflow-hidden py-1 z-50 transition-colors">
              <div className="px-4 py-2 border-b border-gray-100 dark:border-[#262626] mb-1">
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Select Role</p>
              </div>
              <button 
                onClick={() => { dispatch({ type: ActionTypes.SET_ROLE, payload: 'Viewer' }); setIsRoleMenuOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === 'Viewer' ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#262626] hover:text-gray-900 dark:hover:text-white'}`}
              >
                Viewer
              </button>
              <button 
                onClick={() => { dispatch({ type: ActionTypes.SET_ROLE, payload: 'Admin' }); setIsRoleMenuOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${role === 'Admin' ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#262626] hover:text-gray-900 dark:hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

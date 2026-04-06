import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Edit2, Trash2, PlusCircle, CheckCircle2, Download } from 'lucide-react';
import { useAppState, useAppDispatch, ActionTypes } from '../context/AppContext';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { Skeleton } from '../components/common/Skeleton';

const Transactions = () => {
  const { transactions, filters, role, isLoading } = useAppState();
  const dispatch = useAppDispatch();
  const isAdmin = role === 'Admin';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (tx) => {
    setTransactionToEdit(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction? This action cannot be undone.")) {
      dispatch({ type: ActionTypes.DELETE_TRANSACTION, payload: id });
      showToast('Transaction deleted successfully!');
    }
  };

  const handleAddNew = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  // Export functions
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Description', 'Category', 'Amount', 'Type'];
    const rows = filteredAndSortedTransactions.map(tx => [
      tx.id, new Date(tx.date).toISOString().split('T')[0], `"${tx.description}"`, tx.category, tx.amount, tx.type
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported to CSV successfully!');
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(filteredAndSortedTransactions, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported to JSON successfully!');
  };

  // Formatting utils
  const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;
  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    }).format(new Date(dateStr));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (filters.sortBy === key && filters.sortOrder === 'asc') {
      direction = 'desc';
    }
    dispatch({ type: ActionTypes.SET_FILTER, payload: { sortBy: key, sortOrder: direction } });
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.type !== 'All') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.search) {
      const lowerQuery = filters.search.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(lowerQuery) || 
        t.category.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      if (filters.sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (filters.sortBy === 'amount') {
        return filters.sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, filters]);

  if (isLoading) {
    return (
      <div className="space-y-6 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 dark:border-[#262626] pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Transactions</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your transaction history.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm">
          <Skeleton className="h-20 rounded-none w-full border-b border-gray-200 dark:border-[#262626]" />
          <div className="p-4 space-y-4">
             {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-500 px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3 animate-fade-in-up">
           <CheckCircle2 className="w-5 h-5" />
           <p className="font-medium">{toast}</p>
        </div>
      )}

      <TransactionModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         transactionToEdit={transactionToEdit}
         showToast={showToast}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 dark:border-[#262626] pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Transactions</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage your transaction history.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
           <div className="flex bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm">
              <button onClick={handleExportCSV} className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors flex items-center gap-2 border-r border-gray-200 dark:border-[#262626]">
                <Download className="w-4 h-4" /> CSV
              </button>
              <button onClick={handleExportJSON} className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" /> JSON
              </button>
           </div>
           {isAdmin && (
             <button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 justify-center shrink-0">
               <PlusCircle className="w-5 h-5" />
               Add Transaction
             </button>
           )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm transition-colors">
        {/* Controls */}
        <div className="p-5 border-b border-gray-200 dark:border-[#262626] flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-[#0a0a0a]/30">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Search description or category..." 
              value={filters.search}
              onChange={(e) => dispatch({ type: ActionTypes.SET_FILTER, payload: { search: e.target.value } })}
              className="bg-white dark:bg-[#262626] text-sm text-gray-900 dark:text-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-transparent focus:border-blue-500/30"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm border border-gray-200 dark:border-[#262626] px-3 py-2.5 rounded-lg bg-white dark:bg-[#171717] text-gray-500 dark:text-gray-400 flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4" /> Filter
            </span>
            <select 
              value={filters.type}
              onChange={(e) => dispatch({ type: ActionTypes.SET_FILTER, payload: { type: e.target.value } })}
              className="bg-white dark:bg-[#262626] text-sm text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-transparent rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none flex-1 sm:flex-none cursor-pointer hover:border-gray-300 dark:hover:border-[#404040] transition-colors"
              style={{ paddingRight: '2.5rem', backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-[#171717]/80 border-b border-gray-200 dark:border-[#262626] text-gray-500 dark:text-gray-500 tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-2">
                    Date <ArrowUpDown className={`w-3.5 h-3.5 ${filters.sortBy === 'date' ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4">Description</th>
                <th scope="col" className="px-6 py-4">Category</th>
                <th scope="col" className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('amount')}>
                  <div className="flex items-center gap-2">
                    Amount <ArrowUpDown className={`w-3.5 h-3.5 ${filters.sortBy === 'amount' ? 'text-blue-500' : 'text-gray-400 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`} />
                  </div>
                </th>
                <th scope="col" className="px-6 py-4">Type</th>
                {isAdmin && <th scope="col" className="px-6 py-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTransactions.length > 0 ? (
                filteredAndSortedTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 dark:border-[#262626] hover:bg-gray-50 dark:hover:bg-[#262626]/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300 font-medium tracking-tight">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {tx.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white dark:bg-[#262626] text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-[#404040]/50 shadow-sm">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-semibold ${tx.type === 'Income' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                      {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase ${tx.type === 'Income' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 border border-green-200 dark:border-green-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20'}`}>
                        {tx.type}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(tx)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(tx.id)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? "6" : "5"} className="px-6 py-16 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#262626]/50 flex items-center justify-center border border-gray-200 dark:border-[#404040]">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-gray-900 dark:text-gray-300">No transactions found</p>
                        <p className="text-sm">Try adjusting your search criteria or filter type.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        {filteredAndSortedTransactions.length > 0 && (
           <div className="p-4 border-t border-gray-200 dark:border-[#262626] text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-[#0a0a0a]/30">
             Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredAndSortedTransactions.length}</span> of <span className="font-medium text-gray-700 dark:text-gray-300">{transactions.length}</span> transactions
           </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;

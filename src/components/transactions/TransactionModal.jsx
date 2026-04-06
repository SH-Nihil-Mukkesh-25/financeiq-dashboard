import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch, ActionTypes } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionModal = ({ isOpen, onClose, transactionToEdit, showToast }) => {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: 'Other',
    type: 'Expense'
  });
  const [error, setError] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Salary', 'Freelance', 'Other'];

  useEffect(() => {
    if (isOpen) {
      if (transactionToEdit) {
        try {
          const date = new Date(transactionToEdit.date);
          const offset = date.getTimezoneOffset() * 60000;
          const localISOTime = (new Date(date - offset)).toISOString().slice(0, 16);
          setFormData({
            ...transactionToEdit,
            date: localISOTime,
            amount: transactionToEdit.amount.toString()
          });
        } catch(e) {
          setFormData({ ...transactionToEdit, amount: transactionToEdit.amount.toString()});
        }
      } else {
        const d = new Date();
        const offset = d.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d - offset)).toISOString().slice(0, 16);
        setFormData({
          date: localISOTime,
          description: '',
          amount: '',
          category: 'Food',
          type: 'Expense'
        });
      }
      setError('');
    }
  }, [isOpen, transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.description || !formData.amount) {
      setError('All fields are required.');
      return;
    }
    const amt = parseFloat(formData.amount);
    if (isNaN(amt) || amt <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    const payload = {
      ...formData,
      amount: amt,
      id: transactionToEdit ? transactionToEdit.id : `tx-${Date.now()}`,
      date: new Date(formData.date).toISOString()
    };

    if (transactionToEdit) {
      dispatch({ type: ActionTypes.EDIT_TRANSACTION, payload });
      showToast('Transaction updated successfully!');
    } else {
      dispatch({ type: ActionTypes.ADD_TRANSACTION, payload });
      showToast('Transaction added successfully!');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#171717] border border-gray-200 dark:border-[#262626] rounded-xl w-full max-w-md xl:max-w-xl shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-transparent">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
              <button onClick={onClose} className="p-1.5 text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-5">
              {error && <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500 text-sm rounded-lg font-medium">{error}</div>}
              
              <div className="flex gap-4">
                <button type="button" onClick={() => setFormData({...formData, type: 'Expense'})} className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${formData.type === 'Expense' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/30' : 'bg-gray-50 dark:bg-[#262626] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-[#262626]/80'}`}>Expense</button>
                <button type="button" onClick={() => setFormData({...formData, type: 'Income'})} className={`flex-1 py-2.5 rounded-lg font-medium transition-colors ${formData.type === 'Income' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-500 border border-green-200 dark:border-green-500/30' : 'bg-gray-50 dark:bg-[#262626] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-[#262626]/80'}`}>Income</button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-1.5">Date & Time</label>
                <input type="datetime-local" className="w-full bg-white dark:bg-[#0a0a0a]/50 border border-gray-300 dark:border-[#262626] rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-1.5">Description</label>
                <input type="text" placeholder="e.g. Grocery Shopping" className="w-full bg-white dark:bg-[#0a0a0a]/50 border border-gray-300 dark:border-[#262626] rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-1.5">Amount (₹)</label>
                  <input type="number" step="0.01" min="0" placeholder="0.00" className="w-full bg-white dark:bg-[#0a0a0a]/50 border border-gray-300 dark:border-[#262626] rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm"
                      value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-400 mb-1.5">Category</label>
                  <select className="w-full bg-white dark:bg-[#0a0a0a]/50 border border-gray-300 dark:border-[#262626] rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm"
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                 <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-transparent hover:bg-gray-200 dark:hover:bg-[#262626] transition-colors border border-gray-200 dark:border-transparent">Cancel</button>
                 <button type="submit" className="flex-1 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">Save Transaction</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { transactionsData } from '../data/mockData';

const getInitialState = () => {
  const localTx = localStorage.getItem('financeiq_transactions');
  const localDark = localStorage.getItem('financeiq_darkMode');

  const defaultDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return {
    transactions: localTx ? JSON.parse(localTx) : transactionsData,
    filters: {
      search: '',
      type: 'All',
      sortBy: 'date',
      sortOrder: 'desc',
    },
    role: 'Viewer',
    darkMode: localDark !== null ? JSON.parse(localDark) : defaultDark,
    isLoading: true, // Used to trigger skeleton loaders
  };
};

export const ActionTypes = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_FILTER: 'SET_FILTER',
  SET_ROLE: 'SET_ROLE',
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  SET_LOADING: 'SET_LOADING'
};

function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TRANSACTION:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case ActionTypes.EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? action.payload : tx
        ),
      };
    case ActionTypes.DELETE_TRANSACTION:
      return { ...state, transactions: state.transactions.filter((tx) => tx.id !== action.payload) };
    case ActionTypes.SET_FILTER:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ActionTypes.SET_ROLE:
      return { ...state, role: action.payload };
    case ActionTypes.TOGGLE_DARK_MODE:
      return { ...state, darkMode: !state.darkMode };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const AppStateContext = createContext();
const AppDispatchContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('financeiq_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('financeiq_darkMode', JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Simulate network load
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) throw new Error('useAppState must be used within an AppProvider');
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) throw new Error('useAppDispatch must be used within an AppProvider');
  return context;
};

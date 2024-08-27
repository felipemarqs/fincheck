import { useMemo } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';

export const useMonthlySummaryController = () => {
  const {
    areValuesVisible,
    transactions,
    isFetchingTransactions,
    isTransactionsInitialLoading,
  } = useDashboard();

  const totalIncome = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'INCOME') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const totalOutcome = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'EXPENSE') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);
  }, [transactions]);

  return {
    areValuesVisible,
    totalIncome,
    totalOutcome,
    isFetchingTransactions:
      isTransactionsInitialLoading || isFetchingTransactions,
  };
};

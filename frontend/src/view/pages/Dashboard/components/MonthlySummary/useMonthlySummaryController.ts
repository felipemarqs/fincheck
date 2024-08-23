import { useMemo } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useTransactions } from '@/app/hooks/useTransactions';

export const useMonthlySummaryController = () => {
  const { areValuesVisible, filters } = useDashboard();

  const { transactions, isFetchingTransactions, isInitialLoading } =
    useTransactions(filters);

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
    isFetchingTransactions: isInitialLoading || isFetchingTransactions,
  };
};

import { useMemo } from 'react';
import { useDashboard } from '../DashboardContext/useDashboard';

export const useMonthlySummaryController = () => {
  const { bankAccounts, areValuesVisible, toggleValuesVisibility } =
    useDashboard();

  const currentBalance = useMemo(() => {
    if (!bankAccounts) return 0;

    return bankAccounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  }, [bankAccounts]);

  return { currentBalance, areValuesVisible, toggleValuesVisibility };
};

import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../app/utils/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();

  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const { bankAccounts, isFetchingBankAccounts } = useBankAccounts();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const currentBalance = useMemo(() => {
    if (!bankAccounts) return 0;

    return bankAccounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
  }, [bankAccounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetchingBankAccounts,
    accounts: bankAccounts,
    openNewAccountModal,
    currentBalance,
  };
};

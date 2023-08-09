import { useState } from 'react';
import { useBankAccounts } from '../../../../../../app/hooks/useBankAccounts';

export const useFiltersModal = () => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >(undefined);
  const [seletedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { bankAccounts } = useBankAccounts();

  const handleSelectBankAccount = (bankAccountId: string) => {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId
    );
  };

  const handleChangeYear = (step: number) => {
    setSelectedYear((prevState) => prevState + step);
  };
  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    seletedYear,
    handleChangeYear,
    bankAccounts,
  };
};

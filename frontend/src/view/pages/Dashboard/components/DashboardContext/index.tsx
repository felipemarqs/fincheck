import { createContext, useCallback, useState } from 'react';
import React from 'react';
import { BankAccount } from '../../../../../app/entities/BankAccount';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  newTransationType: 'INCOME' | 'EXPENSE' | null;
  accountBeingEdited: null | BankAccount;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  handleOpenFiltersModal(): void;
  isFiltersModalOpen: boolean;
  handleCloseFiltersModal(): void;
  filters: TransactionsFilters;
  handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
  handleChangeFilters: <TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) => (value: TransactionsFilters[TFilter]) => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransationType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<null | BankAccount>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  const handleApplyFilters = ({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) => {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    handleCloseFiltersModal();
  };

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  //Togle New Account Modal
  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  //Toogle Transation Modal
  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  //Togle Edit Account Modal
  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setIsEditAccountModalOpen(true);
    setAccountBeingEdited(bankAccount);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransationType,
        openEditAccountModal,
        closeEditAccountModal,
        isEditAccountModalOpen,
        accountBeingEdited,
        handleOpenFiltersModal,
        isFiltersModalOpen,
        handleCloseFiltersModal,
        filters,
        handleApplyFilters,
        handleChangeFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

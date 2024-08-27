import { createContext, useCallback, useState } from 'react';
import React from 'react';
import { BankAccount } from '../../../../../app/entities/BankAccount';
import {
  TransactionsFilters,
  TransactionsResponse,
} from '../../../../../app/services/transactionsService/getAll';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { BannkAccountResponse } from '@/app/services/bankAccountService/getAll';
import { useTransactions } from '@/app/hooks/useTransactions';
interface DashboardContextValue {
  //transactions
  transactions: TransactionsResponse;
  isFetchingTransactions: boolean;
  isTransactionsInitialLoading: boolean;
  handleRefechTransactions(): void;

  //bankAccounts
  bankAccounts: BannkAccountResponse;
  isFetchingBankAccounts: boolean;

  //Visibility Values
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;

  // New Account Modal Functions
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;

  // New Installment Purchase Modal Functions
  isNewInstallmentPurchaseModalOpen: boolean;
  closeNewInstallmentPurchaseModal(): void;
  openNewInstallmentPurchaseModal(): void;

  // New Transaction Modal Functions
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  newTransationType: 'INCOME' | 'EXPENSE' | null;

  // Edit Account Modal Functions
  isEditAccountModalOpen: boolean;
  accountBeingEdited: null | BankAccount;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;

  // Filters Modal Functions
  isFiltersModalOpen: boolean;
  handleOpenFiltersModal(): void;
  handleCloseFiltersModal(): void;

  // Filters Functions
  filters: TransactionsFilters;
  handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }): void;
  handleChangeFilters: <TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) => (value: TransactionsFilters[TFilter]) => void;

  // Credit Card Modal Functions
  openNewCreditCardModal(): void;
  closeNewCreditCardModal(): void;
  isNewCreditCardModalOpen: boolean;

  // Contact Modal Functions
  openNewContactModal(): void;
  closeNewContactModal(): void;
  isNewContactModalOpen: boolean;
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
  const [
    isNewInstallmentPurchaseModalOpen,
    setIsNewInstallmentPurchaseModalOpen,
  ] = useState(false);
  const [newTransationType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<null | BankAccount>(null);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isNewCreditCardModalOpen, setIsNewCreditCardModalOpen] =
    useState(false);

  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const { bankAccounts, isFetchingBankAccounts } = useBankAccounts();
  const {
    transactions,
    isFetchingTransactions,
    isInitialLoading: isTransactionsInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

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

  const handleRefechTransactions = useCallback(() => {
    refetchTransactions();
  }, []);

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

  //Togle New Installment Modal
  const openNewInstallmentPurchaseModal = useCallback(() => {
    setIsNewInstallmentPurchaseModalOpen(true);
  }, []);

  const closeNewInstallmentPurchaseModal = useCallback(() => {
    setIsNewInstallmentPurchaseModalOpen(false);
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

  //Togle open New Credit Card Modal
  const openNewCreditCardModal = useCallback(() => {
    setIsNewCreditCardModalOpen(true);
  }, []);

  const closeNewCreditCardModal = useCallback(() => {
    setIsNewCreditCardModalOpen(false);
  }, []);

  //Togle open New Credit Card Modal
  const openNewContactModal = useCallback(() => {
    setIsNewContactModalOpen(true);
  }, []);

  const closeNewContactModal = useCallback(() => {
    setIsNewContactModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        bankAccounts,
        isFetchingBankAccounts,
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
        closeNewCreditCardModal,
        openNewCreditCardModal,
        isNewCreditCardModalOpen,
        isNewContactModalOpen,
        openNewContactModal,
        closeNewContactModal,
        isNewInstallmentPurchaseModalOpen,
        closeNewInstallmentPurchaseModal,
        openNewInstallmentPurchaseModal,
        transactions,
        isFetchingTransactions,
        isTransactionsInitialLoading,
        handleRefechTransactions,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

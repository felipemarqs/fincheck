import { Transaction } from '../../../../../app/entities/Transaction';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useState, useEffect } from 'react';

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdit, setTransactionBeingEdit] =
    useState<null | Transaction>(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

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

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setIsEditModalOpen(true);
    setTransactionBeingEdit(transaction);
    console.log({ transaction });
  };

  const handleCloseEditTransactionModal = () => {
    setIsEditModalOpen(false);
    setTransactionBeingEdit(null);
  };

  return {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    filters,
    handleApplyFilters,
    handleChangeFilters,
    transactionBeingEdit,
    isEditModalOpen,
    handleOpenEditTransactionModal,
    handleCloseEditTransactionModal,
  };
};

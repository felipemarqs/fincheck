import { Transaction } from '../../../../../app/entities/Transaction';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { useDashboard } from '../DashboardContext/useDashboard';
import { useState, useEffect } from 'react';

export const useTransactionsController = () => {
  const {
    areValuesVisible,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    filters,
    handleApplyFilters,
    handleChangeFilters,
  } = useDashboard();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdit, setTransactionBeingEdit] =
    useState<null | Transaction>(null);

  const {
    transactions,
    isFetchingTransactions,
    isInitialLoading,
    refetchTransactions,
  } = useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setIsEditModalOpen(true);
    setTransactionBeingEdit(transaction);
    console.log({ transaction });
  };

  const handleCloseEditTransactionModal = () => {
    refetchTransactions();
    setIsEditModalOpen(false);
    setTransactionBeingEdit(null);
  };

  return {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isFetchingTransactions,
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

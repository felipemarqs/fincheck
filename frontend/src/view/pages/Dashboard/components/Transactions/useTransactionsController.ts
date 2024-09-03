import { Transaction } from '../../../../../app/entities/Transaction';
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
    transactions,
    isFetchingTransactions,
    isTransactionsInitialLoading,
    handleRefechTransactions,
  } = useDashboard();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdit, setTransactionBeingEdit] =
    useState<null | Transaction>(null);

  useEffect(() => {
    handleRefechTransactions();
  }, [filters, handleRefechTransactions]);

  const handleOpenEditTransactionModal = (transaction: Transaction) => {
    setIsEditModalOpen(true);
    setTransactionBeingEdit(transaction);
  };

  const handleCloseEditTransactionModal = () => {
    handleRefechTransactions();
    setIsEditModalOpen(false);
    setTransactionBeingEdit(null);
  };

  console.log('filters', filters);

  return {
    areValuesVisible,
    isTransactionsInitialLoading,
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

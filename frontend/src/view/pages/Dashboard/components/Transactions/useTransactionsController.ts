import { useDashboard } from "../DashboardContext/useDashboard";
import { useState } from "react";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  const handleOpenFiltersModal = () => {
    setIsFiltersModalOpen(true);
  };

  const handleCloseFiltersModal = () => {
    setIsFiltersModalOpen(false);
  };

  return {
    areValuesVisible,
    isInitialLoading: false,
    transactions: [1],
    isLoading: false,
    isFiltersModalOpen,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  };
};

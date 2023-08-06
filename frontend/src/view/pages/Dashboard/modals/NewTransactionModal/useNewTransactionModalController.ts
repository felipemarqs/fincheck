import { useDashboard } from "../../components/DashboardContext/useDashboard";

export const useNewTransactionModalController = () => {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransationType } = useDashboard();

  return { isNewTransactionModalOpen, closeNewTransactionModal, newTransationType };
};

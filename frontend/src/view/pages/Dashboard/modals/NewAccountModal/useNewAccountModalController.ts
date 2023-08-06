import { useDashboard } from "../../components/DashboardContext/useDashboard";

export const useNewAccountModalController = () => {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  return { isNewAccountModalOpen, closeNewAccountModal };
};

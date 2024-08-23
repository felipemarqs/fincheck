import { useInstallmentPurchasesContext } from '../InstallmentPurchasesContext/useInstallmentPurchasesContext';

export const useInstallmentPurchasesContainer = () => {
  const { installmentPurchases, openEditInstallmentPurchaseModal } =
    useInstallmentPurchasesContext();

  return {
    installmentPurchases,
    openEditInstallmentPurchaseModal,
  };
};

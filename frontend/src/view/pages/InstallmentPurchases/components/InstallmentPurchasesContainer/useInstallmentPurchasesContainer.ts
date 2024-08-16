import { useInstallmentPurchasesContext } from '../InstallmentPurchasesContext/useInstallmentPurchasesContext';

export const useInstallmentPurchasesContainer = () => {
  const { installmentPurchases } = useInstallmentPurchasesContext();

  return {
    installmentPurchases,
  };
};

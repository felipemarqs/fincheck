import { useContext } from 'react';
import { InstallmentPurchasesContext } from '.';

export const useInstallmentPurchasesContext = () => {
  return useContext(InstallmentPurchasesContext);
};

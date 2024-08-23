import { InstallmentPurchase } from '@/app/entities/InstallmentPurchase';
import { useInstallmentPurchases } from '@/app/hooks/useInstallmentPurchases';
import { ContactsResponse } from '@/app/services/contactsService/getAll';
import { InstallmentPurchaseResponse } from '@/app/services/installmentPurchasesService/getAll';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';
import React from 'react';

interface InstallmentPurchasesContextValue {
  //Contacts
  installmentPurchases: InstallmentPurchaseResponse;
  isFetchingInstallmentPurchases: boolean;
  refetchInstallmentPurchases: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ContactsResponse, Error>>;

  // New Installment Purchase Modal Functions
  isNewInstallmentPurchaseModalOpen: boolean;
  closeNewInstallmentPurchaseModal(): void;
  openNewInstallmentPurchaseModal(): void;

  //Edit Contact
  openEditInstallmentPurchaseModal(
    installmentPurchases: InstallmentPurchase
  ): void;
  closeEditInstallmentPurchaseModal(): void;
  installmentPurchaseBeingEdited: null | InstallmentPurchase;
  isEditInstallmentPurchaseModalOpen: boolean;
}

export const InstallmentPurchasesContext = createContext(
  {} as InstallmentPurchasesContextValue
);

export const InstallmentPurchasesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    installmentPurchases,
    isFetchingInstallmentPurchases,
    refetchInstallmentPurchases,
  } = useInstallmentPurchases();
  console.log('installmentPurchases', installmentPurchases);
  const [
    isNewInstallmentPurchaseModalOpen,
    setIsNewInstallmentPurchaseModalOpen,
  ] = useState(false);
  const [
    isEditInstallmentPurchaseModalOpen,
    setIsEditInstallmentPurchaseModalOpen,
  ] = useState(false);

  const [installmentPurchaseBeingEdited, setInstallmentPurchaseBeingEdited] =
    useState<null | InstallmentPurchase>(null);

  //Togle open Edit InstallmentPurchase Modal
  const openEditInstallmentPurchaseModal = useCallback(
    (installmentPurchases: InstallmentPurchase) => {
      setIsEditInstallmentPurchaseModalOpen(true);
      setInstallmentPurchaseBeingEdited(installmentPurchases);
    },
    []
  );

  const closeEditInstallmentPurchaseModal = useCallback(() => {
    setIsEditInstallmentPurchaseModalOpen(false);
    setInstallmentPurchaseBeingEdited(null);
  }, []);

  //Togle New Installment Modal
  const openNewInstallmentPurchaseModal = useCallback(() => {
    setIsNewInstallmentPurchaseModalOpen(true);
  }, []);

  const closeNewInstallmentPurchaseModal = useCallback(() => {
    setIsNewInstallmentPurchaseModalOpen(false);
  }, []);

  return (
    <InstallmentPurchasesContext.Provider
      value={{
        installmentPurchases,
        isFetchingInstallmentPurchases,
        refetchInstallmentPurchases,
        installmentPurchaseBeingEdited,
        openEditInstallmentPurchaseModal,
        closeEditInstallmentPurchaseModal,
        closeNewInstallmentPurchaseModal,
        openNewInstallmentPurchaseModal,
        isEditInstallmentPurchaseModalOpen,
        isNewInstallmentPurchaseModalOpen,
      }}
    >
      {children}
    </InstallmentPurchasesContext.Provider>
  );
};

import { Contact } from '@/app/entities/Contact';
import { InstallmentPurchase } from '@/app/entities/InstallmentPurchase';
import { useContacts } from '@/app/hooks/useContacts';
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
  openEditContactModal(contact: Contact): void;
  closeEditContactModal(): void;
  contactBeingEdited: null | Contact;
  isEditContactModalOpen: boolean;
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
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);

  const [contactBeingEdited, setContactBeingEdited] = useState<null | Contact>(
    null
  );

  //Togle open Edit Contact Modal
  const openEditContactModal = useCallback((contact: Contact) => {
    setIsEditContactModalOpen(true);
    setContactBeingEdited(contact);
  }, []);

  const closeEditContactModal = useCallback(() => {
    setIsEditContactModalOpen(false);
    setContactBeingEdited(null);
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
        contactBeingEdited,
        openEditContactModal,
        closeEditContactModal,
        closeNewInstallmentPurchaseModal,
        openNewInstallmentPurchaseModal,
        isEditContactModalOpen,
        isNewInstallmentPurchaseModalOpen,
      }}
    >
      {children}
    </InstallmentPurchasesContext.Provider>
  );
};

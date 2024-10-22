import { Contact } from '@/app/entities/Contact';
import { useContacts } from '@/app/hooks/useContacts';
import { ContactsResponse } from '@/app/services/contactsService/getAll';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';
import React from 'react';

interface ContactsContextValue {
  //Contacts
  contacts: ContactsResponse;
  isFetchingContacts: boolean;
  refetchContacts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ContactsResponse, Error>>;

  // Contact Modal Functions
  openNewContactModal(): void;
  closeNewContactModal(): void;
  isNewContactModalOpen: boolean;

  //Edit Contact
  openEditContactModal(contact: Contact): void;
  closeEditContactModal(): void;
  contactBeingEdited: null | Contact;
  isEditContactModalOpen: boolean;
}

export const ContactsContext = createContext({} as ContactsContextValue);

export const ContactsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contacts, isFetchingContacts, refetchContacts } = useContacts();
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
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

  //Togle open New Contact Modal
  const openNewContactModal = useCallback(() => {
    setIsNewContactModalOpen(true);
  }, []);

  const closeNewContactModal = useCallback(() => {
    setIsNewContactModalOpen(false);
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isFetchingContacts,
        isNewContactModalOpen,
        openNewContactModal,
        closeNewContactModal,
        contactBeingEdited,
        openEditContactModal,
        closeEditContactModal,
        isEditContactModalOpen,
        refetchContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

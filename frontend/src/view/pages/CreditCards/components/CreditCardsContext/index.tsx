import { CreditCard } from '@/app/entities/CreditCard';
import { useCreditCards } from '@/app/hooks/useCreditCards';
import { CreditCardsResponse } from '@/app/services/creditCardsService/getAll';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';
import React from 'react';

interface CreditCardsContextValue {
  //Credit Cards
  creditCards: CreditCardsResponse;
  isFetchingCreditCards: boolean;
  refetchCreditCards: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CreditCardsResponse, Error>>;

  // CreditCard Modal Functions
  openNewCreditCardModal(): void;
  closeNewCreditCardModal(): void;
  isNewCreditCardModalOpen: boolean;

  //Edit CreditCard
  openEditCreditCardModal(creditCard: CreditCard): void;
  closeEditCreditCardModal(): void;
  creditCardBeingEdited: null | CreditCard;
  isEditCreditCardModalOpen: boolean;
}

export const CreditCardsContext = createContext({} as CreditCardsContextValue);

export const CreditCardsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { creditCards, isFetchingCreditCards, refetchCreditCards } =
    useCreditCards();
  const [isNewCreditCardModalOpen, setIsNewCreditCardModalOpen] =
    useState(false);
  const [isEditCreditCardModalOpen, setIsEditCreditCardModalOpen] =
    useState(false);

  const [creditCardBeingEdited, setcreditCardBeingEdited] =
    useState<null | CreditCard>(null);

  //Togle open Edit CreditCard Modal
  const openEditCreditCardModal = useCallback((creditCard: CreditCard) => {
    setIsEditCreditCardModalOpen(true);
    setcreditCardBeingEdited(creditCard);
  }, []);

  const closeEditCreditCardModal = useCallback(() => {
    setIsEditCreditCardModalOpen(false);
    setcreditCardBeingEdited(null);
  }, []);

  console.log(creditCardBeingEdited);

  //Togle open New CreditCard Modal
  const openNewCreditCardModal = useCallback(() => {
    setIsNewCreditCardModalOpen(true);
  }, []);

  const closeNewCreditCardModal = useCallback(() => {
    setIsNewCreditCardModalOpen(false);
  }, []);

  return (
    <CreditCardsContext.Provider
      value={{
        creditCards,
        isFetchingCreditCards,
        isNewCreditCardModalOpen,
        openNewCreditCardModal,
        closeNewCreditCardModal,
        creditCardBeingEdited,
        openEditCreditCardModal,
        closeEditCreditCardModal,
        isEditCreditCardModalOpen,
        refetchCreditCards,
      }}
    >
      {children}
    </CreditCardsContext.Provider>
  );
};

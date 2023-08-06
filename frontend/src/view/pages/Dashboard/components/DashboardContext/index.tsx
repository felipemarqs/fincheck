import { createContext, useCallback, useState } from "react";
import React from "react";
interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
  closeNewTransactionModal(): void;
  newTransationType: "INCOME" | "EXPENSE" | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransationType, setNewTransactionType] = useState<"INCOME" | "EXPENSE" | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  //Togle New Account Modal
  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  //Toogle Transation Modal
  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransationType,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

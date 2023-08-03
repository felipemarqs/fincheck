import { createContext, useCallback, useState } from "react";
import React from "react";
interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider value={{ areValuesVisible, toggleValuesVisibility }}>
      {children}
    </DashboardContext.Provider>
  );
};

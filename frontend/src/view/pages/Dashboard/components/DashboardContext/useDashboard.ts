import { useContext } from "react";
import { DashboardContext } from ".";

export const useDashboard = () => {
  return useContext(DashboardContext);
};

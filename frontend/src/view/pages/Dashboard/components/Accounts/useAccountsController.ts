import { useState } from "react";
import { useWindowWidth } from "../../../../../app/utils/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();

  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
  };
};

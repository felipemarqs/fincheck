import { useState } from "react";

export const useAccountsController = () => {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
  };
};

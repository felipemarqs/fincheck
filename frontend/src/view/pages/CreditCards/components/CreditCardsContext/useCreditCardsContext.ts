import { useContext } from 'react';
import { CreditCardsContext } from '.';

export const useCreditCardsContext = () => {
  return useContext(CreditCardsContext);
};

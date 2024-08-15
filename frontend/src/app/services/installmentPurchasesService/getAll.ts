import { CreditCard } from '@/app/entities/CreditCard';

import { httpClient } from '../httpClient';

export type CreditCardsResponse = Array<CreditCard>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<CreditCardsResponse>(
    `/installment-purchases`
  );

  return data;
};

import { httpClient } from '../httpClient';
import { InstallmentPurchase } from '@/app/entities/InstallmentPurchase';

export type InstallmentPurchaseResponse = Array<InstallmentPurchase>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<InstallmentPurchaseResponse>(
    `/installment-purchases`
  );

  return data;
};

import { httpClient } from '../httpClient';

export const remove = async (installmentPurchaseId: string) => {
  const { data } = await httpClient.delete(
    `/installment-purchases/${installmentPurchaseId}`
  );

  return data;
};

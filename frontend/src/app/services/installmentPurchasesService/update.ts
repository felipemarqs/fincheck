import { httpClient } from '../httpClient';
import { InstallmentPurchaseParams } from './create';

export interface UpdateInstallmentPurchase extends InstallmentPurchaseParams {
  id: string;
}

export const update = async ({ id, ...params }: UpdateInstallmentPurchase) => {
  const { data } = await httpClient.put(`/installment-purchases/${id}`, params);
  console.log('data', params);
  return data;
};

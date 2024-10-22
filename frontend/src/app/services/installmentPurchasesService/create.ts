import { httpClient } from '../httpClient';

export interface InstallmentPurchaseParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  totalValue: number;
  numberOfInstallments: number;
  startDate: string;
  type: 'EXPENSE';
  creditCardId?: string;
}

export const create = async (params: InstallmentPurchaseParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/installment-purchases', params);

  return data;
};

import { httpClient } from '../httpClient';

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export const create = async (params: CreateTransactionParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/transactions', params);

  return data;
};

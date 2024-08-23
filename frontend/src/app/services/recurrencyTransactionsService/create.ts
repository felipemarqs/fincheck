import { httpClient } from '../httpClient';

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  startDate: string;
  endDate?: string;
  type: 'INCOME' | 'EXPENSE';
  recurrence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  creditCardId?: string;
}

export const create = async (params: CreateTransactionParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/recurring-transactions', params);

  return data;
};

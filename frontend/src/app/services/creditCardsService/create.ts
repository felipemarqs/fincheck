import { httpClient } from '../httpClient';

export interface CreateCreditCardParams {
  bankAccountId: string;
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
  color: string;
}

// {
//   "bankAccountId": "b41e0ae3-f89c-4eb8-8086-06358e9a743c",
//   "name": "Cartão de Crédito",
//   "limit": 5000.00,
//   "closingDay": 15,
//   "dueDay": 25
// }

export const create = async (params: CreateCreditCardParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/credit-cards', params);

  return data;
};

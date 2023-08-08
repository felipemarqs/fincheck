import { httpClient } from '../httpClient';

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export const create = async (params: CreateBankAccountParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
};

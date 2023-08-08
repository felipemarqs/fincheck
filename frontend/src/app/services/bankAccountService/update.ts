import { httpClient } from '../httpClient';

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export const update = async ({ id, ...params }: UpdateBankAccountParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
};

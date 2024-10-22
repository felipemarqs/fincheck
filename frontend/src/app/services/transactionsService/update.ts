import { httpClient } from '../httpClient';
import { CreateTransactionParams } from './create';

export interface UpdateTransactionParams extends CreateTransactionParams {
  id: string;
}

export const update = async ({ id, ...params }: UpdateTransactionParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
};

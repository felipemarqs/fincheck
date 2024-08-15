import { httpClient } from '../httpClient';
import { CreateCreditCardParams } from './create';

export interface UpdateCreditCardParams extends CreateCreditCardParams {
  id: string;
}

export const update = async ({ id, ...params }: UpdateCreditCardParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/credit-cards/${id}`, params);

  return data;
};

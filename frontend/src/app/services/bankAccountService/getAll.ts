import { BankAccount } from '../../entities/BankAccount';
import { httpClient } from '../httpClient';

export type BannkAccountResponse = Array<BankAccount>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<BannkAccountResponse>('/bank-accounts');

  return data;
};

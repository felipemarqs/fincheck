import { httpClient } from '../httpClient';

export const remove = async (transactionId: string) => {
  const { data } = await httpClient.delete(`/credit-cars/${transactionId}`);

  return data;
};

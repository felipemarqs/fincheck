import { httpClient } from '../httpClient';

export const remove = async (creditCardId: string) => {
  const { data } = await httpClient.delete(`/credit-cards/${creditCardId}`);

  return data;
};

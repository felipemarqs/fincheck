import { httpClient } from '../httpClient';

export const remove = async (contactId: string) => {
  console.log('contactId', contactId);

  const { data } = await httpClient.delete(`/contacts/${contactId}`);

  return data;
};

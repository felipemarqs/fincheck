import { Contact } from '../../entities/Contact';
import { httpClient } from '../httpClient';

export type ContactsResponse = Array<Contact>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<ContactsResponse>(`/contacts`);

  return data;
};

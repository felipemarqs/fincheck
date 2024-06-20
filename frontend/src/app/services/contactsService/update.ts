import { httpClient } from '../httpClient';

export interface updateContactsParams {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export const update = async ({ id, ...params }: updateContactsParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/contacts/${id}`, params);

  return data;
};

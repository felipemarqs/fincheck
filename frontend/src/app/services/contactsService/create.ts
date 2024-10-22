import { httpClient } from '../httpClient';

export interface createContactsParams {
  name: string;
  email?: string;
  phone?: string;
}

export const create = async (params: createContactsParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post('/contacts', params);

  return data;
};

import { User } from '../../entities/User';
import { httpClient } from '../httpClient';

type MeResponse = User;

export const me = async () => {
  const { data } = await httpClient.get<MeResponse>('/users/me');
  return data;
};

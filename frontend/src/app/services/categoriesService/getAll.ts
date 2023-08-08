import { Category } from '../../entities/Category';
import { httpClient } from '../httpClient';

type CategoryResponse = Array<Category>;

export const getAll = async () => {
  //await timeout(1500);
  const { data } = await httpClient.get<CategoryResponse>('/categories');

  return data;
};

import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../services/categoriesService';
import { queryKeys } from '../config/queryKeys';

export const useCategories = () => {
  const { data = [], isFetching } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: categoriesService.getAll,
  });
  return { categories: data ?? [], isFetching };
};

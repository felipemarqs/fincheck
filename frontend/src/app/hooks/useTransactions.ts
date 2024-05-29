import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactionsService';
import { TransactionsFilters } from '../services/transactionsService/getAll';
import { queryKeys } from '../config/queryKeys';

export const useTransactions = (filters: TransactionsFilters) => {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.TRANSACTIONS],
    queryFn: () => transactionsService.getAll(filters),
  });
  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetchTransactions: refetch,
  };
};
